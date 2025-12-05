"use client";
import { useCanvas } from "@/context/context";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { Canvas } from "fabric";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CanvasEditor = ({ project }) => {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef();
  const containerRef = useRef();

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
    if (!canvasRef.current || !project || canvasEditor) return;

    const initializeCanvas = async () => {
      setIsLoading(true);
      const viewPortScale = calculateViewPortScale();
      const canvas = new Canvas(canvasRef.current, {
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
    };
  }, [project]);

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

      <div className="px-5">
        <canvas id="canvas" className="border" ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasEditor;
