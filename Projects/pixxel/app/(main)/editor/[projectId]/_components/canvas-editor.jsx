"use client";
import { useCanvas } from "@/context/context";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { Canvas, FabricImage } from "fabric";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CanvasEditor = ({ project }) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef();
  const fabricInstanceRef = useRef(null);
  const canvasContainerRef = useRef();

  const { canvasEditor, setCanvasEditor, activeTool, onToolChange } =
    useCanvas();

  const { mutate: updateProject } = useConvexMutation(
    api.projects.updateProject
  );

  const calculateViewPortScale = () => {
    if (!containerRef.current || !project) return 1;

    const container = containerRef.current;
    const containerWidth = container.clientWidth - 40; // 40px padding
    const containerHeight = container.clientHeight - 40;

    const scaleX = containerWidth / project.width;
    const scaleY = containerHeight / project.height;

    // Use the smaller scale to ensure the canvas fits completely
    // Cap at 1 to prevent upscaling beyond original size
    return Math.min(scaleX, scaleY, 1);
  };

  useEffect(() => {
    if (!canvasContainerRef.current || !project) return;

    const initializeCanvas = async () => {
      // Dispose existing canvas if any
      if (fabricInstanceRef.current) {
        fabricInstanceRef.current.dispose();
        fabricInstanceRef.current = null;
        setCanvasEditor(null);
      }

      // Create fresh canvas element
      const canvasEl = document.createElement('canvas');
      canvasEl.id = 'canvas';
      canvasEl.className = 'border';
      canvasContainerRef.current.innerHTML = '';
      canvasContainerRef.current.appendChild(canvasEl);

      setIsLoading(true);
      const viewPortScale = calculateViewPortScale();
      const canvas = new Canvas(canvasEl, {
        width: project.width, // Logical canvas width (design dimensions)
        height: project.height, // Logical canvas height (design dimensions)

        backgroundColor: "#ffffff", // Default white background

        preserveObjectStacking: true, // Maintain object layer order
        controlsAboveOverlay: true, // Show selection controls above overlay
        selection: true, // Enable object selection

        hoverCursor: "move", // Cursor when hovering over objects
        moveCursor: "move", // Cursor when moving objects
        defaultCursor: "default", // Default Cursor

        allowTouchScrolling: false, // Disable touch scrolling (prevents conflicts)
        renderOnAddRemove: true, // Auto-render when objects are added/removed
        skipTargetFind: false, // Allow object targetting for interactions
      });

      canvas.setDimensions(
        {
          width: project.width * viewPortScale, // Scaled display width
          height: project.height * viewPortScale, // Scaled display height
        },
        { backstoreOnly: false }
      );

      // Apply zoom to scale the entire canvas content
      canvas.setZoom(viewPortScale);

      const scaleFactor = window.devicePixelRatio || 1;
      if(scaleFactor > 1) {
        // Increase canvas resolution for high DPI displays
        canvas.getElement().width = project.width * scaleFactor;
        canvas.getElement().height = project.height * scaleFactor;
        // Scale the drawing context to match
        canvas.getContext().scale(scaleFactor, scaleFactor)
      }

      if(project.canvasState) {
        try {
          await canvas.loadFromJSON(project.canvasState);
          canvas.requestRenderAll();
        } catch (error) {
          console.error("Error loading canvas state:", error)
        }
      } else if(project.currentImageUrl || project.originalImageUrl) {
        try {
          const imageUrl = project.currentImageUrl || project.originalImageUrl;
          const fabricImage = await FabricImage.fromURL(imageUrl, {
            crossOrigin: "anonymous",
          })

          const scale = Math.min(
            project.width / fabricImage.width,
            project.height / fabricImage.height
          );

          fabricImage.scale(scale);
          fabricImage.set({
            left: project.width / 2,
            top: project.height / 2,
            originX: 'center',
            originY: 'center',
            selectable: true,
            evented: true,
          })

          canvas.add(fabricImage);
          canvas.sendObjectToBack(fabricImage);
        } catch (error) {
          console.error("Error loading project image:", error)
        }
      }

      canvas.calcOffset(); // recalculate canvas position for event handling
      canvas.requestRenderAll(); // Trigger initial render
      
      fabricInstanceRef.current = canvas;
      setCanvasEditor(canvas); // store canvas instance in context

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
      }, 500)

      setIsLoading(false);
    };

    initializeCanvas();

    return () => {
      if(fabricInstanceRef.current) {
        fabricInstanceRef.current.dispose();
        fabricInstanceRef.current = null;
        setCanvasEditor(null);
      }
    }
  }, [project._id]);

  useEffect(() => {
    if (!canvasEditor || !project) return;

    let saveTimeout;
    
    const saveCanvasState = async () => {
      try {
        const canvasJSON = canvasEditor.toJSON();
        await updateProject({
          projectId: project._id,
          canvasState: canvasJSON,
        });
      } catch (error) {
        console.error("Error saving canvas state:", error);
      }
    };

    const handleCanvasChange = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveCanvasState();
      }, 2000);
    };

    canvasEditor.on("object:modified", handleCanvasChange);
    canvasEditor.on("object:added", handleCanvasChange);
    canvasEditor.on("object:removed", handleCanvasChange);

    return () => {
      clearTimeout(saveTimeout);
      canvasEditor.off("object:modified", handleCanvasChange);
      canvasEditor.off("object:added", handleCanvasChange);
      canvasEditor.off("object:removed", handleCanvasChange);
    };
  }, [canvasEditor, project, updateProject]);

  useEffect(() => {
    const handleResize = () => {
      if(!canvasEditor || !project) return;

      // recalculate optimal scale for new window size
      const newScale = calculateViewPortScale();

      // Update canvas display dimensions
      canvasEditor.setDimensions(
        {
          width: project.width * newScale,
          height: project.height * newScale
        },
        {
          backstoreOnly: false
        }
      )

      canvasEditor.setZoom(newScale);
      canvasEditor.calcOffset(); // Update mouse event coordinates
      canvasEditor.requestRenderAll(); // Re-render with new dimensions
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [canvasEditor, project])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center bg-secondary w-full h-full overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(45deg, #64748b 25%, transparent 25%),
          linear-gradient(-45deg, #64748b 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #64748b 75%),
          linear-gradient(-45deg, transparent 75%, #64748b 75%)
        `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10, 10px -10px, -10px 0px",
        }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 z-10">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin w-8 h-8" />
            <p className="text-white/70 text-sm">Loading canvas...</p>
          </div>
        </div>
      )}

      <div className="px-5" ref={canvasContainerRef}></div>
    </div>
  );
};

export default CanvasEditor;
