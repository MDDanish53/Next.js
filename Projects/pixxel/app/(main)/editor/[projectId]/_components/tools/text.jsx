"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/context/context";
import { IText } from "fabric";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Trash2,
  Type,
  Underline,
} from "lucide-react";
import { useEffect, useState } from "react";

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Tahoma",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino Linotype",
  "Segoe UI",
  "Roboto",
  "Open Sans",
  "Poppins",
  "Montserrat",
  "Lato",
  "Nunito",
  "Raleway",
  "Oswald",
  "Merriweather",
  "Ubuntu",
  "Inter",
  "Playfair Display",
  "DM Sans",
  "Fira Sans",
  "JetBrains Mono",
  "Source Code Pro",
  "Source Sans Pro",
  "Noto Sans",
  "Noto Serif",
  "Rubik",
  "Cabin",
  "Karla",
  "Manrope",
  "Work Sans",
  "Inconsolata",
];

const FONT_SIZES = { min: 8, max: 200, default: 20 };

const TextControls = () => {
  const { canvasEditor } = useCanvas();

  const [selectedText, setSelectedText] = useState(null); // Currently selected text object
  const [fontFamily, setFontFamily] = useState("Arial"); // Current font family
  const [fontSize, setFontSize] = useState(FONT_SIZES.default); // Current font size
  const [textColor, setTextColor] = useState("#ffffff"); // Current text color
  const [textAlign, setTextAlign] = useState("left"); // Current text alignment
  const [_, setChanged] = useState(0); // Force re-render trigger for button states

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-white/70 text-sm">Canvas not ready</p>
      </div>
    );
  }

  const updateSelectedText = () => {
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();

    if (activeObject && activeObject.type === "i-text") {
      setSelectedText(activeObject);

      // Sync UI controls with the selected text's current properties
      setFontFamily(activeObject.fontFamily || "Arial");
      setFontSize(activeObject.fontSize || FONT_SIZES.default);
      setTextColor(activeObject.fill || "#000000");
      setTextAlign(activeObject.textAlign || "left");
    } else {
      // No text selected, clear the selectedText state
      setSelectedText(null);
    }
  };

  const applyFontFamily = (family) => {
    if (!selectedText) return;
    setFontFamily(family); // Update local state
    selectedText.set("fontFamily", family); // Update Fabric.js object property
    canvasEditor.requestRenderAll(); // Re-render to show changes
  };

  const applyFontSize = (size) => {
    if (!selectedText) return;

    // Handle both direct values and array values from Slider component
    const newSize = Array.isArray(size) ? size[0] : size;
    setFontSize(newSize); // Update local state

    selectedText.set("fontSize", newSize); // Update Fabric.js object
    canvasEditor.requestRenderAll();
  };

  const applyTextAlign = (alignment) => {
    if (!selectedText) return;

    setTextAlign(alignment);
    selectedText.set("textAlign", alignment);
    canvasEditor.requestRenderAll();
  };

  const applyTextColor = (color) => {
    if (!selectedText) return;

    setTextColor(color);
    selectedText.set("fill", color); // In Fabric.js, "fill" property controls text color
    canvasEditor.requestRenderAll();
  };

  const toggleFormat = (format) => {
    if (!selectedText) return;

    switch (format) {
      case "bold": {
        // Toggle between normal and bold font weight
        const current = selectedText.fontWeight || "normal";
        selectedText.set("fontWeight", current === "bold" ? "normal" : "bold");
        break;
      }
      case "italic": {
        // Toggle between normal and italic font style
        const current = selectedText.fontStyle || "normal";
        selectedText.set(
          "fontStyle",
          current === "italic" ? "normal" : "italic"
        );
        break;
      }
      case "underline": {
        // Toggle underline on/off
        const current = selectedText.underline || false;
        selectedText.set("underline", !current);
        break;
      }
    }

    canvasEditor.requestRenderAll();
    setChanged((c) => c + 1); // Force component re-render to update button active states
  };

  const deleteSelectedText = () => {
    if(!canvasEditor || !selectedText) return;

    canvasEditor.remove(selectedText); // Remove from canvas
    canvasEditor.requestRenderAll(); // Re-render canvas
    setSelectedText(null); // Clear selection state
  }

  useEffect(() => {
    if (!canvasEditor) return;

    updateSelectedText();

    const handleSelectionCreated = () => updateSelectedText(); // When user selects an object
    const handleSelectionUpdated = () => updateSelectedText(); // When selection changes to different object
    const handleSelectionCleared = () => setSelectedText(null); // When user deselects everything

    canvasEditor.on("selection:created", handleSelectionCreated);
    canvasEditor.on("selection:updated", handleSelectionUpdated);
    canvasEditor.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvasEditor.off("selection:created", handleSelectionCreated);
      canvasEditor.off("selection:updated", handleSelectionUpdated);
      canvasEditor.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvasEditor]);

  const addText = () => {
    if (!canvasEditor) return;

    const text = new IText("Edit this text", {
      left: canvasEditor.width / 2, // Center horizontally
      top: canvasEditor.height / 2, // Center vertically
      originX: "center", // use center as horizontal origin point
      originY: "center", // use center as vertical origin point
      fontFamily, // use current font family setting
      fontSize,
      fill: textColor, // use current color setting
      textAlign, // use current alignment setting
      scaleX: 2, // Make text 2x larger horizontally
      scaleY: 2, // Make text 2x larger vertically
      editable: true, // Allow direct text editing on canvas
      selectable: true, // Allow object selection and transformation
    });

    canvasEditor.add(text);
    canvasEditor.setActiveObject(text);
    canvasEditor.requestRenderAll(); // Trigger canvas re-render

    setTimeout(() => {
      text.enterEditing(); // switch to text editing mode
      text.selectAll(); // select all text for immediate editing
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-white mb-2">Add Text</h3>
          <p className="text-xs text-white/70 mb-4">
            Click to add editable text to your canvas
          </p>
        </div>
        <Button onClick={addText} className="w-full" variant="primary">
          <Type className="h-4 w-4 mr-2" />
          Add Text
        </Button>
      </div>

      {selectedText && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-medium text-white mb-4">
            Edit Selected Text
          </h3>
          <div className="space-y-2 mb-4">
            <label className="text-xs text-white/70">Font Family</label>

            <select
              value={fontFamily}
              onChange={(e) => applyFontFamily(e.target.value)}
              className="w-full px-3 py-2 my-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/70">Font Size</label>
              <span className="text-xs text-white/70">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]} // Slider expects array format
              onValueChange={applyFontSize} // Calls with array format
              min={FONT_SIZES.min}
              max={FONT_SIZES.max}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-xs text-white/70">Text Alignment</label>
            <div className="grid grid-cols-4 gap-1">
              {[
                ["left", AlignLeft],
                ["center", AlignCenter],
                ["right", AlignRight],
                ["justify", AlignJustify],
              ].map(([align, Icon]) => (
                <Button
                  key={align}
                  onClick={() => applyTextAlign(align)}
                  variant={textAlign === align ? "default" : "outline"}
                  size="sm"
                  className="p-2"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-xs text-white/70">Text Color</label>
            <div className="flex gap-2">
              {/* Native Color Picker */}
              <input
                type="color"
                value={textColor}
                onChange={(e) => applyTextColor(e.target.value)}
                className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              {/* Text input for manual hex entry */}
              <Input
                value={textColor}
                onChange={(e) => applyTextColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-slate-700 border-white/20 text-white text-sm"
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-xs text-white/70">Formatting</label>
            <div className="flex gap-2 py-2">
            <Button
              onClick={() => toggleFormat("bold")}
              variant={
                selectedText.fontWeight === "bold" ? "default" : "outline"
              }
              size="sm"
              className="flex-1"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => toggleFormat("italic")}
              variant={
                selectedText.fontStyle === "italic" ? "default" : "outline"
              }
              size="sm"
              className="flex-1"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => toggleFormat("underline")}
              variant={
                selectedText.underline ? "default" : "outline"
              }
              size="sm"
              className="flex-1">
              <Underline className="h-4 w-4" />
            </Button>
            </div>
          </div>

          <Button onClick={deleteSelectedText} variant="outline" className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Text
          </Button>

        </div>
      )}

      <div className="bg-slate-700/30 rounded-lg p-3">
        <p className="text-xs text-white/70">
          <strong>Double-click</strong> any text to edit it directly on canvas.
          <br />
          <strong>Select</strong> text to see formatting options here.
        </p>
      </div>
    </div>
  );
};

export default TextControls;
