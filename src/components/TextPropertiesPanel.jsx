import React from "react";
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
import { Trash2, Type, Palette, Move, AlignLeft, Bold } from "lucide-react";

export default function TextPropertiesPanel({
  element,
  updateElement,
  updateElementStyle,
  deleteElement,
}) {
  if (!element) return null;

  // ✅ Merge styles safely
  const handleStyleChange = (key, value) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value,
      },
    });
  };

  const fontOptions = [
    { value: "Arial, sans-serif", category: "Sans Serif", display: "Arial" },
    {
      value: "Helvetica, sans-serif",
      category: "Sans Serif",
      display: "Helvetica",
    },
    { value: "Roboto, sans-serif", category: "Sans Serif", display: "Roboto" },
    {
      value: "Open Sans, sans-serif",
      category: "Sans Serif",
      display: "Open Sans",
    },
    { value: "Lato, sans-serif", category: "Sans Serif", display: "Lato" },
    {
      value: "Montserrat, sans-serif",
      category: "Sans Serif",
      display: "Montserrat",
    },
    {
      value: "Poppins, sans-serif",
      category: "Sans Serif",
      display: "Poppins",
    },
    { value: "Inter, sans-serif", category: "Sans Serif", display: "Inter" },
    {
      value: "Raleway, sans-serif",
      category: "Sans Serif",
      display: "Raleway",
    },
    { value: "Oswald, sans-serif", category: "Sans Serif", display: "Oswald" },
    {
      value: "Times New Roman, serif",
      category: "Serif",
      display: "Times New Roman",
    },
    { value: "Georgia, serif", category: "Serif", display: "Georgia" },
    { value: "Garamond, serif", category: "Serif", display: "Garamond" },
    {
      value: "Playfair Display, serif",
      category: "Serif",
      display: "Playfair Display",
    },
    {
      value: "Merriweather, serif",
      category: "Serif",
      display: "Merriweather",
    },
    { value: "Baskerville, serif", category: "Serif", display: "Baskerville" },
    { value: "Palatino, serif", category: "Serif", display: "Palatino" },
    { value: "Bodoni, serif", category: "Serif", display: "Bodoni" },
    {
      value: "Courier New, monospace",
      category: "Monospace",
      display: "Courier New",
    },
    {
      value: "Calibri, sans-serif",
      category: "Sans Serif",
      display: "Calibri",
    },
    {
      value: "Verdana, sans-serif",
      category: "Sans Serif",
      display: "Verdana",
    },
    { value: "Tahoma, sans-serif", category: "Sans Serif", display: "Tahoma" },
    { value: "Futura, sans-serif", category: "Sans Serif", display: "Futura" },
    {
      value: "Gill Sans, sans-serif",
      category: "Sans Serif",
      display: "Gill Sans",
    },
    { value: "Avenir, sans-serif", category: "Sans Serif", display: "Avenir" },
    {
      value: "Franklin Gothic, sans-serif",
      category: "Sans Serif",
      display: "Franklin Gothic",
    },
    { value: "Didot, serif", category: "Serif", display: "Didot" },
  ];

  const groupedFonts = fontOptions.reduce((groups, font) => {
    if (!groups[font.category]) groups[font.category] = [];
    groups[font.category].push(font);
    return groups;
  }, {});

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          Text Properties
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Customize typography, colors, and layout for your{" "}
          <Badge variant="secondary" className="text-xs">
            text content
          </Badge>{" "}
          elements.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Accordion
          type="multiple"
          defaultValue={["typography"]}
          className="w-full"
        >
          {/* Typography Section */}
          <AccordionItem value="typography" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-emerald-50/50 hover:bg-emerald-50 border-b">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Typography</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Font Family</Label>
                  <Select
                    value={element.styles?.fontFamily || ""}
                    onValueChange={(value) =>
                      handleStyleChange("fontFamily", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96">
                      {Object.entries(groupedFonts).map(([category, fonts]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                            {category}
                          </div>
                          {fonts.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              <span style={{ fontFamily: font.value }}>
                                {font.display}
                              </span>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Font Size</Label>
                    <div className="flex gap-1 items-center">
                      <Input
                        type="number"
                        min="8"
                        value={parseInt(element.styles?.fontSize) || 16}
                        onChange={(e) =>
                          handleStyleChange("fontSize", `${e.target.value}px`)
                        }
                        className="text-sm"
                      />
                      <Badge variant="outline" className="text-xs">
                        px
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      <Bold className="w-3 h-3" />
                      Weight
                    </Label>
                    <Select
                      value={element.styles?.fontWeight || "normal"}
                      onValueChange={(value) =>
                        handleStyleChange("fontWeight", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light</SelectItem>
                        <SelectItem value="400">Normal</SelectItem>
                        <SelectItem value="600">Semibold</SelectItem>
                        <SelectItem value="700">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Line Height</Label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
                      min="0.5"
                      step="0.1"
                      value={parseFloat(element.styles?.lineHeight) || 1.5}
                      onChange={(e) =>
                        handleStyleChange("lineHeight", e.target.value)
                      }
                      className="text-sm"
                    />
                    <Badge variant="outline" className="text-xs">
                      em
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Controls spacing between lines
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <AlignLeft className="w-3 h-3" />
                    Text Alignment
                  </Label>
                  <Select
                    value={element.styles?.textAlign || "left"}
                    onValueChange={(value) =>
                      handleStyleChange("textAlign", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Colors Section */}
          <AccordionItem value="colors" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-purple-50/50 hover:bg-purple-50 border-b">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Colors</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={element.styles?.color || "#000000"}
                      onChange={(e) =>
                        handleStyleChange("color", e.target.value)
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={element.styles?.color || "#000000"}
                      onChange={(e) =>
                        handleStyleChange("color", e.target.value)
                      }
                      className="flex-1 font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Background Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={element.styles?.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleStyleChange("backgroundColor", e.target.value)
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={element.styles?.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleStyleChange("backgroundColor", e.target.value)
                      }
                      className="flex-1 font-mono text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Spacing Section */}
          <AccordionItem value="spacing" className="border-0">
            <AccordionTrigger className="px-4 py-3 bg-green-50/50 hover:bg-green-50 border-b">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-green-600" />
                <span className="font-medium">Spacing</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-6 pt-2">
                {/* Padding */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Padding</Label>
                    <Badge variant="outline" className="text-xs">
                      px
                    </Badge>
                  </div>
                  <Card className="bg-slate-50 border-dashed">
                    <CardContent className="p-3">
                      <div className="grid grid-cols-2 gap-3">
                        {["Top", "Right", "Bottom", "Left"].map((side) => {
                          const key = `padding${side}`;
                          return (
                            <div key={key} className="space-y-1">
                              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                                {side}
                              </Label>
                              <Input
                                type="number"
                                value={parseInt(element.styles?.[key]) || 0}
                                onChange={(e) =>
                                  handleStyleChange(key, `${e.target.value}px`)
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Margin */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Margin</Label>
                    <Badge variant="outline" className="text-xs">
                      px
                    </Badge>
                  </div>
                  <Card className="bg-slate-50 border-dashed">
                    <CardContent className="p-3">
                      <div className="grid grid-cols-2 gap-3">
                        {["Top", "Right", "Bottom", "Left"].map((side) => {
                          const key = `margin${side}`;
                          return (
                            <div key={key} className="space-y-1">
                              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                                {side}
                              </Label>
                              <Input
                                type="number"
                                value={parseInt(element.styles?.[key]) || 0}
                                onChange={(e) =>
                                  handleStyleChange(key, `${e.target.value}px`)
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
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
