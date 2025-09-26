import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Trash2,
  Image as ImageIcon,
  Palette,
  Move,
  Layers,
  RotateCw,
  Upload,
  Link,
  Eraser,
  Wand2,
} from "lucide-react";

const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export default function ImagePropertiesPanel({
  element,
  updateElement,
  handleImageUpload,
  deleteElement,
}) {
  if (!element) return null;

  const fileInputRef = useRef(null);
  const isImagePresent =
    element.content && element.content.startsWith("data:image");

  // Hook up double-click event from canvas to open file picker
  React.useEffect(() => {
    if (!isBrowser()) return;
    const handler = (ev) => {
      // optionally check identity: if (ev.detail?.id !== element.id) return;
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    window.addEventListener("open-image-upload", handler);
    return () => window.removeEventListener("open-image-upload", handler);
  }, [element?.id]);

  // ✅ Corrected handler to manage all border properties together
  const handleStyleChange = (key, value) => {
    const updatedStyles = {
      ...element.styles,
      [key]: value,
    };

    // Ensure border style is always set to 'solid' when border is active
    if (key === "borderWidth" && parseInt(value) > 0) {
      updatedStyles.borderStyle = updatedStyles.borderStyle || "solid";
      updatedStyles.borderColor = updatedStyles.borderColor || "#000000";
    }

    // If the color changes and a width is not set, default it to 1px
    if (key === "borderColor" && !updatedStyles.borderWidth) {
      updatedStyles.borderWidth = "1px";
      updatedStyles.borderStyle = updatedStyles.borderStyle || "solid";
    }

    updateElement(element.id, { styles: updatedStyles });
  };

  // ✅ Update image URL
  const handleURLChange = (e) => {
    updateElement(element.id, { content: e.target.value });
  };

  // ✅ Handles bringing the element to the front or back
  const handleLayerChange = (direction) => {
    if (direction === "front") {
      handleStyleChange("zIndex", 1000);
    } else if (direction === "back") {
      handleStyleChange("zIndex", 1);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
          Image Properties
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Upload images, customize appearance, and control{" "}
          <Badge variant="secondary" className="text-xs">
            visual properties
          </Badge>{" "}
          for your image elements.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Accordion type="multiple" defaultValue={["source"]} className="w-full">
          {/* Image Source Section */}
          <AccordionItem value="source" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-cyan-50/50 hover:bg-cyan-50 border-b">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-600" />
                <span className="font-medium">Image Source</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                {/* Image Preview */}
                {isImagePresent && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Current Image</Label>
                    <div className="relative">
                      <img
                        src={element.content}
                        alt="Current"
                        className="w-full max-h-32 object-contain rounded-md border"
                      />
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {isImagePresent ? "Change Image" : "Upload Image"}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleImageUpload(element.id, file);
                    }}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      OR
                    </span>
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Link className="w-3 h-3" />
                    Image URL
                  </Label>
                  <Input
                    type="url"
                    value={
                      element.content && !isImagePresent ? element.content : ""
                    }
                    onChange={handleURLChange}
                    placeholder="https://example.com/image.jpg"
                    className="transition-all duration-200"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rest of the existing accordion items... */}

          {/* Dimensions & Layout Section */}
          <AccordionItem value="layout" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-purple-50/50 hover:bg-purple-50 border-b">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Dimensions & Layout</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                {/* Size Controls */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Width</Label>
                    <div className="flex gap-1 items-center">
                      <Input
                        type="number"
                        value={parseInt(element.styles?.width) || 300}
                        onChange={(e) =>
                          handleStyleChange("width", `${e.target.value}px`)
                        }
                        className="text-sm"
                      />
                      <Badge variant="outline" className="text-xs">
                        px
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Height</Label>
                    <div className="flex gap-1 items-center">
                      <Input
                        type="number"
                        value={parseInt(element.styles?.height) || 200}
                        onChange={(e) =>
                          handleStyleChange("height", `${e.target.value}px`)
                        }
                        className="text-sm"
                      />
                      <Badge variant="outline" className="text-xs">
                        px
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Object Fit */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Image Fit</Label>
                  <Select
                    value={element.styles?.objectFit || "contain"}
                    onValueChange={(value) =>
                      handleStyleChange("objectFit", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select fit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contain">
                        Contain - Fit within bounds
                      </SelectItem>
                      <SelectItem value="cover">
                        Cover - Fill container
                      </SelectItem>
                      <SelectItem value="fill">
                        Fill - Stretch to fit
                      </SelectItem>
                      <SelectItem value="none">None - Original size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alignment */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Alignment</Label>
                  <Select
                    value={element.styles?.textAlign || "left"}
                    onValueChange={(value) =>
                      handleStyleChange("textAlign", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Styling Section */}
          <AccordionItem value="styling" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-orange-50/50 hover:bg-orange-50 border-b">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Styling</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                {/* Border */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Border</Label>
                  <Card className="bg-slate-50 border-dashed">
                    <CardContent className="p-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                            Width
                          </Label>
                          <div className="flex gap-1 items-center">
                            <Input
                              type="number"
                              value={parseInt(element.styles?.borderWidth) || 0}
                              onChange={(e) =>
                                handleStyleChange(
                                  "borderWidth",
                                  `${e.target.value}px`
                                )
                              }
                              className="h-8 text-sm"
                            />
                            <Badge variant="outline" className="text-xs">
                              px
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                            Color
                          </Label>
                          <Input
                            type="color"
                            value={element.styles?.borderColor || "#000000"}
                            onChange={(e) =>
                              handleStyleChange("borderColor", e.target.value)
                            }
                            className="h-8 w-full p-1 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                          Style
                        </Label>
                        <Select
                          value={element.styles?.borderStyle || "solid"}
                          onValueChange={(value) =>
                            handleStyleChange("borderStyle", value)
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="solid">Solid</SelectItem>
                            <SelectItem value="dashed">Dashed</SelectItem>
                            <SelectItem value="dotted">Dotted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Border Radius */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Border Radius</Label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
                      value={parseInt(element.styles?.borderRadius) || 0}
                      onChange={(e) =>
                        handleStyleChange("borderRadius", `${e.target.value}px`)
                      }
                      className="text-sm"
                    />
                    <Badge variant="outline" className="text-xs">
                      px
                    </Badge>
                  </div>
                </div>

                {/* Opacity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Opacity</Label>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(
                        (element.styles?.opacity !== undefined
                          ? parseFloat(element.styles.opacity)
                          : 1) * 100
                      )}
                      %
                    </Badge>
                  </div>
                  <Slider
                    value={[
                      element.styles?.opacity !== undefined
                        ? parseFloat(element.styles.opacity)
                        : 1,
                    ]}
                    onValueChange={(value) =>
                      handleStyleChange("opacity", value[0].toString())
                    }
                    max={1}
                    min={0}
                    step={0.05}
                    className="w-full"
                  />
                </div>

                {/* Shadow */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Drop Shadow</Label>
                  <Switch
                    checked={
                      element.styles?.boxShadow &&
                      element.styles.boxShadow !== "none"
                    }
                    onCheckedChange={(checked) =>
                      handleStyleChange(
                        "boxShadow",
                        checked ? "2px 2px 8px rgba(0,0,0,0.3)" : "none"
                      )
                    }
                  />
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <RotateCw className="w-3 h-3" />
                    Rotation
                  </Label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
                      value={
                        parseInt(
                          element.styles?.transform?.match(/-?\d+/)?.[0]
                        ) || 0
                      }
                      onChange={(e) =>
                        handleStyleChange(
                          "transform",
                          `rotate(${e.target.value}deg)`
                        )
                      }
                      className="text-sm"
                    />
                    <Badge variant="outline" className="text-xs">
                      deg
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Layering Section */}
          <AccordionItem value="layering" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-green-50/50 hover:bg-green-50 border-b">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-green-600" />
                <span className="font-medium">Layering</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Z-Index Control</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleLayerChange("front")}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Layers className="w-3 h-3" />
                      To Front
                    </Button>
                    <Button
                      onClick={() => handleLayerChange("back")}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Layers className="w-3 h-3 rotate-180" />
                      To Back
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Control which elements appear above or below others
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        {/* Footer with Delete Button */}
        <div className="p-4">
          <Button
            onClick={() => deleteElement(element.id)}
            variant="destructive"
            className="w-full gap-2 font-medium"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete Element
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
