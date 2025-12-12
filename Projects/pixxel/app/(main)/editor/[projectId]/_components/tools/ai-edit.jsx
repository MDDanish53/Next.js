"use client";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { FabricImage } from "fabric";
import { Camera, CheckCircle, Info, Mountain, Sparkles, User, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RETOUCH_PRESETS = [
  {
    key: "ai_retouch",
    label: "AI Retouch",
    description: "Improve image quality with AI",
    icon: Sparkles,
    transform: "e-retouch",
    recommended: true,
  },
  {
    key: "ai_upscale",
    label: "AI Upscale",
    description: "Increase resolution to 16MP",
    icon: User,
    transform: "e-upscale",
    recommended: false,
  },
  {
    key: "enhance_sharpen",
    label: "Enhance & Sharpen",
    description: "AI retouch + contrast + sharpening",
    icon: Mountain,
    transform: "e-retouch,e-contrast,e-sharpen",
    recommended: false,
  },
  {
    key: "premium_quality",
    label: "Premium Quality",
    description: "AI retouch + upscale + enhancements",
    icon: Camera,
    transform: "e-retouch,e-upscale,e-contrast,e-sharpen",
    recommended: false,
  },
];

const AIEditor = ({ project }) => {
  const { canvasEditor, setProcessingMessage } = useCanvas();

  const [selectedPreset, setSelectedPreset] = useState("ai_retouch");

  const { mutate: updateProject } = useConvexMutation(
    api.projects.updateProject
  );

  const getMainImage = () => {
    return (
      canvasEditor?.getObjects().find((obj) => obj.type === "image") || null
    );
  };

  const hasActiveTransformations = () => {
    return project.activeTransformations?.includes("e-retouch");
  };

  const selectedPresetData = RETOUCH_PRESETS.find(
    (p) => p.key === selectedPreset
  );

  const buildRetouchUrl = (imageUrl, presetKey) => {
    const preset = RETOUCH_PRESETS.find((p) => p.key === presetKey)
    if(!imageUrl || !preset) return imageUrl;
    
    const [baseUrl, existingQuery] = imageUrl.split("?")

    if(existingQuery) {
      const params = new URLSearchParams(existingQuery);
      const existingTr = params.get("tr"); // Get existing transformation parameter

      if(existingTr) {
        // Append new transformations to existing ones
        // Example: "w-800,h-600" becomes "w-800,h-600,e-retouch"
        return `${baseUrl}?tr=${existingTr},${preset.transform}`
      }
    }

    return `${baseUrl}?tr=${preset.transform}`
  }

  const applyRetouch = async () => {
    const mainImage = getMainImage();

    if(!mainImage || !project || !selectedPresetData) return;

    setProcessingMessage(`Enhancing image with ${selectedPresetData.label}...`)

    try {
      const currentImageUrl = mainImage.getSrc?.() || mainImage._element?.src || mainImage.src;

      const retouchedUrl = buildRetouchUrl(currentImageUrl, selectedPreset);

      let retouchedImage;
      try {
        retouchedImage = await FabricImage.fromURL(retouchedUrl, {
          crossOrigin: "anonymous",
        });
      } catch {
        // If transformation fails, use original image
        retouchedImage = await FabricImage.fromURL(currentImageUrl, {
          crossOrigin: "anonymous",
        });
      }

      const imageProps = {
        left: mainImage.left, // X position
        top: mainImage.top, // Y position
        originX: mainImage.originX, // Transform origin point X
        originY: mainImage.originY, // Transform origin point Y
        angle: mainImage.angle, // Rotation angle
        scaleX: mainImage.scaleX, // Horizontal scale
        scaleY: mainImage.scaleY, // Vertical scale
        selectable: true, // Allow user to select this object
        evented: true, // Allow events (click, drag, etc)
      }

      canvasEditor.remove(mainImage); // Remove original image
      retouchedImage.set(imageProps); // Apply preserved properties
      canvasEditor.add(retouchedImage); // Add enhanced image to canvas
      retouchedImage.setCoords(); // Update object coordinates for selection
      canvasEditor.setActiveObject(retouchedImage); // Make it the active object
      canvasEditor.requestRenderAll(); // Re-render the canvas

      await updateProject({
        projectId: project._id,
        currentImageUrl: retouchedUrl, // store the enhanced image url
        canvasState: canvasEditor.toJSON(), // save current canvas state
        activeTransformations: selectedPresetData.transform, // Track applied transformations
      })
      
      toast.success(`${selectedPresetData.label} applied successfully!`)
    } catch (error) {
      console.error("Error retouching image:", error);
      toast.error("failed to retouch image. Please try again.")
    } finally {
      setProcessingMessage(null)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {hasActiveTransformations && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-green-400 font-medium mb-1">
                Image Enhanced
              </h3>
              <p className="text-green-300/80 text-sm">
                AI enhancements have been applied to this image
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-white mb-3">
          Choose Enhancement Style
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {RETOUCH_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedPreset === preset.key;
            return (
              <div
                key={preset.key}
                className={`relative p-4 rounded-lg border cursor-pointer transition-all ${isSelected ? "border-cyan-400 bg-cyan-400/10" : "border-white/20 bg-slate-700/30 hover:border-white/40"}`}
                onClick={() => setSelectedPreset(preset.key)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="h-8 w-8 text-cyan-400 mb-2" />
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium text-sm">
                      {preset.label}
                    </h4>
                    {preset.recommended && (
                      <span className="px-1.5 py-0.5 bg-cyan-500 text-white text-xs rounded-full">
                        ★
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 text-xs">{preset.description}</p>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Button onClick={applyRetouch} className="w-full" variant="primary">
          <Wand2 className="h-4 w-4 mr-2" />
          Apply {selectedPresetData?.label}
      </Button>

      <div className="bg-slate-700/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
          <Info className="h-4 w-4"/>
          How AI Retouch Works
        </h4>
        <div className="space-y-2 text-xs text-white/70">
          <p>
            • <strong>AI Retouch:</strong> AI analyzes and applies optimal improvements
          </p>
          <p>
            • <strong>Smart Processing:</strong> Preserves details while enhancing quality
          </p>
          <p>
            • <strong>Multiple Styles:</strong> Choose enhancement that fits your image
          </p>
          <p>
            • <strong>Instant Results:</strong> See improvements in seconds
          </p>
        </div>
      </div>

    </div>
  );
};

export default AIEditor;
