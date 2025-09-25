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
  toggleStyle
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
  // Sans-Serif
  { value: 'Arial, sans-serif', category: 'Sans Serif', display: 'Arial' },
  { value: 'Verdana, sans-serif', category: 'Sans Serif', display: 'Verdana' },
  { value: 'Tahoma, sans-serif', category: 'Sans Serif', display: 'Tahoma' },
  { value: 'Trebuchet MS, sans-serif', category: 'Sans Serif', display: 'Trebuchet MS' },
  { value: 'Segoe UI, sans-serif', category: 'Sans Serif', display: 'Segoe UI' },
  { value: 'Calibri, sans-serif', category: 'Sans Serif', display: 'Calibri' },
  { value: 'Corbel, sans-serif', category: 'Sans Serif', display: 'Corbel' },
  { value: 'Candara, sans-serif', category: 'Sans Serif', display: 'Candara' },
  { value: 'Gill Sans, sans-serif', category: 'Sans Serif', display: 'Gill Sans' },
  { value: 'Franklin Gothic Medium, sans-serif', category: 'Sans Serif', display: 'Franklin Gothic' },
  { value: 'Century Gothic, sans-serif', category: 'Sans Serif', display: 'Century Gothic' },
  { value: 'Futura, sans-serif', category: 'Sans Serif', display: 'Futura' },
  { value: 'Avenir, sans-serif', category: 'Sans Serif', display: 'Avenir' },
  { value: 'Lucida Sans Unicode, sans-serif', category: 'Sans Serif', display: 'Lucida Sans Unicode' },
  { value: 'Segoe Print, sans-serif', category: 'Sans Serif', display: 'Segoe Print' },
  { value: 'Poppins, sans-serif', category: 'Sans Serif', display: 'Poppins' }, // ✅ Added
  { value: 'Helvetica, sans-serif', category: 'Sans Serif', display: 'Helvetica' },
  { value: 'Open Sans, sans-serif', category: 'Sans Serif', display: 'Open Sans' },
  { value: 'Roboto, sans-serif', category: 'Sans Serif', display: 'Roboto' },
  { value: 'Lato, sans-serif', category: 'Sans Serif', display: 'Lato' },
  { value: 'Montserrat, sans-serif', category: 'Sans Serif', display: 'Montserrat' },
  { value: 'Noto Sans, sans-serif', category: 'Sans Serif', display: 'Noto Sans' },

  // Serif
  { value: 'Times New Roman, serif', category: 'Serif', display: 'Times New Roman' },
  { value: 'Georgia, serif', category: 'Serif', display: 'Georgia' },
  { value: 'Garamond, serif', category: 'Serif', display: 'Garamond' },
  { value: 'Palatino Linotype, Book Antiqua, Palatino, serif', category: 'Serif', display: 'Palatino Linotype' },
  { value: 'Cambria, serif', category: 'Serif', display: 'Cambria' },
  { value: 'Constantia, serif', category: 'Serif', display: 'Constantia' },
  { value: 'Baskerville, serif', category: 'Serif', display: 'Baskerville' },
  { value: 'Didot, serif', category: 'Serif', display: 'Didot' },
  { value: 'Book Antiqua, serif', category: 'Serif', display: 'Book Antiqua' },
  { value: 'Century Schoolbook, serif', category: 'Serif', display: 'Century Schoolbook' },
  { value: 'Merriweather, serif', category: 'Serif', display: 'Merriweather' }, // ✅ Added
  { value: 'Playfair Display, serif', category: 'Serif', display: 'Playfair Display' }, // ✅ Added

  // Monospace
  { value: 'Courier New, monospace', category: 'Monospace', display: 'Courier New' },
  { value: 'Consolas, monospace', category: 'Monospace', display: 'Consolas' },
  { value: 'Lucida Console, monospace', category: 'Monospace', display: 'Lucida Console' },
  { value: 'Monaco, monospace', category: 'Monospace', display: 'Monaco' },
  { value: 'Source Code Pro, monospace', category: 'Monospace', display: 'Source Code Pro' },
  { value: 'Inconsolata, monospace', category: 'Monospace', display: 'Inconsolata' }, // ✅ Added
  { value: 'Menlo, monospace', category: 'Monospace', display: 'Menlo' }, // ✅ Added

  // Script / Cursive
  { value: 'Brush Script MT, cursive', category: 'Script', display: 'Brush Script MT' },
  { value: 'Edwardian Script ITC, cursive', category: 'Script', display: 'Edwardian Script ITC' },
  { value: 'Freestyle Script, cursive', category: 'Script', display: 'Freestyle Script' },
  { value: 'French Script MT, cursive', category: 'Script', display: 'French Script MT' },
  { value: 'Segoe Script, cursive', category: 'Script', display: 'Segoe Script' },
  { value: 'Lucida Handwriting, cursive', category: 'Script', display: 'Lucida Handwriting' },
  { value: 'Kristen ITC, cursive', category: 'Script', display: 'Kristen ITC' },
  { value: 'Dancing Script, cursive', category: 'Script', display: 'Dancing Script' }, // ✅ Added
  { value: 'Pacifico, cursive', category: 'Script', display: 'Pacifico' }, // ✅ Added

  // Display / Decorative
  { value: 'Impact, sans-serif', category: 'Display', display: 'Impact' },
  { value: 'Copperplate Gothic, serif', category: 'Display', display: 'Copperplate Gothic' },
  { value: 'Rockwell, serif', category: 'Display', display: 'Rockwell' },
  { value: 'Algerian, serif', category: 'Display', display: 'Algerian' },
  { value: 'Jokerman, cursive', category: 'Display', display: 'Jokerman' },
  { value: 'Chiller, cursive', category: 'Display', display: 'Chiller' },
  { value: 'Engravers MT, serif', category: 'Display', display: 'Engravers MT' },
  { value: 'Elephant, serif', category: 'Display', display: 'Elephant' },
  { value: 'Stencil, sans-serif', category: 'Display', display: 'Stencil' },
  { value: 'Vivaldi, cursive', category: 'Display', display: 'Vivaldi' },
  { value: 'Papyrus, sans-serif', category: 'Display', display: 'Papyrus' },
  { value: 'Snap ITC, sans-serif', category: 'Display', display: 'Snap ITC' },
  { value: 'Bahnschrift, sans-serif', category: 'Display', display: 'Bahnschrift' }, // ✅ Added
  { value: 'Oswald, sans-serif', category: 'Display', display: 'Oswald' }, // ✅ Added
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
{/* <div className="text-toolbar flex gap-2 mb-2">
  <button
    onClick={() => toggleStyle("fontWeight", "bold")}
    className={element.styles.fontWeight === "bold" ? "active" : ""}
  >
    B
  </button>
  <button
    onClick={() => toggleStyle("fontStyle", "italic")}
    className={element.styles.fontStyle === "italic" ? "active" : ""}
  >
    I
  </button>
  <button
    onClick={() => toggleStyle("textDecoration", "underline")}
    className={element.styles.textDecoration === "underline" ? "active" : ""}
  >
    U
  </button>
  <button
    onClick={() => toggleStyle("textShadow", "2px 2px 4px rgba(0,0,0,0.3)")}
  >
    Shadow
  </button>
</div> */}

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
