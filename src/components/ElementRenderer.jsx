import React, { useRef, useState, useEffect } from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaWeixin,
  FaSnapchat,
  FaReddit,
  FaLinkedin,
  FaPinterest,
  FaDiscord,
  FaQuora,
} from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { Globe } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";

// Browser check helper
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

const getIconComponent = (platform) => {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebook className="w-6 h-6" />;
    case "youtube":
      return <FaYoutube className="w-6 h-6" />;
    case "instagram":
      return <FaInstagram className="w-6 h-6" />;
    case "tiktok":
      return <FaTiktok className="w-6 h-6" />;
    case "whatsapp":
      return <FaWhatsapp className="w-6 h-6" />;
    case "telegram":
      return <FaTelegram className="w-6 h-6" />;
    case "wechat":
    case "douyin":
      return <FaWeixin className="w-6 h-6" />;
    case "x":
    case "twitter":
      return <FaXTwitter className="w-6 h-6" />;
    case "snapchat":
      return <FaSnapchat className="w-6 h-6" />;
    case "reddit":
      return <FaReddit className="w-6 h-6" />;
    case "linkedin":
      return <FaLinkedin className="w-6 h-6" />;
    case "pinterest":
      return <FaPinterest className="w-6 h-6" />;
    case "threads":
      return <FaThreads className="w-6 h-6" />;
    case "discord":
      return <FaDiscord className="w-6 h-6" />;
    case "quora":
      return <FaQuora className="w-6 h-6" />;
    default:
      return <Globe className="w-6 h-6" />;
  }
};

// Text alignment consistency helper
const getConsistentTextAlign = (textAlign) => {
  const alignMap = {
    left: "left",
    center: "center",
    right: "right",
    justify: "justify",
    start: "left",
    end: "right",
  };
  return alignMap[textAlign] || "left";
};

// Weight normalization for consistent font rendering
const normalizeWeight = (weight) => {
  if (!weight) return 400;
  if (typeof weight === "string") {
    if (weight === "normal") return 400;
    if (weight === "bold") return 700;
    const parsed = parseInt(weight);
    return isNaN(parsed) ? 400 : parsed;
  }
  return weight;
};

// Border styles helper
const getBorderStyles = (styles) => {
  if (styles.borderWidth && styles.borderColor) {
    const style = styles.borderStyle || "solid";
    return `${styles.borderWidth} ${style} ${styles.borderColor}`;
  }
  return styles.border || "none";
};

// Helper to build spacing from individual properties
const buildSpacing = (styles, property) => {
  const top = styles[`${property}Top`] || "0px";
  const right = styles[`${property}Right`] || "0px";
  const bottom = styles[`${property}Bottom`] || "0px";
  const left = styles[`${property}Left`] || "0px";

  if (top === right && right === bottom && bottom === left) {
    return top;
  }
  return `${top} ${right} ${bottom} ${left}`;
};

// Enhanced stripLayoutTransforms for better text consistency
const stripLayoutTransforms = (node, preserveImageRotation = false) => {
  if (node && node.style) {
    if (!preserveImageRotation) {
      node.style.transform = "none";
      node.style.transformOrigin = "top left";
    }
    node.style.rotate = "";
    node.style.scale = "";
    node.style.translate = "";
    node.style.webkitTransform = preserveImageRotation
      ? node.style.transform
      : "none";
    node.style.msTransform = preserveImageRotation
      ? node.style.transform
      : "none";

    // Ensure consistent text rendering
    node.style.textRendering = "geometricPrecision";
    node.style.webkitFontSmoothing = "antialiased";
    node.style.mozOsxFontSmoothing = "grayscale";

    // Remove any inherited positioning quirks
    if (
      node.tagName === "DIV" ||
      node.tagName === "H1" ||
      node.tagName === "H2" ||
      node.tagName === "H3" ||
      node.tagName === "P"
    ) {
      node.style.lineHeight = node.style.lineHeight || "normal";
      node.style.verticalAlign = "baseline";
    }
  }
};

// Enhanced font loading for exact matching across all exports
const ensureFontsLoaded = async () => {
  const id = "export-fonts";
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    // Include all font weights and styles for exact matching
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&" +
      "family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&" +
      "family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&" +
      "family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&" +
      "display=swap";
    document.head.appendChild(link);

    // Wait longer for font loading
    await new Promise((r) => setTimeout(r, 1500));
  }

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
      // Additional wait to ensure fonts are fully rendered
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      console.warn("Font loading timeout:", e);
    }
  }
};

// Main export element creation with EXACT padding and text positioning
const createExportElement = (element, globalSettings) => {
  const { id, type, content, styles, link, icons, children } = element;

  const div = document.createElement("div");
  div.style.cssText = `
    position: absolute;
    left: ${styles.left || "0"};
    top: ${styles.top || "0"};
    width: ${styles.width || "auto"};
    height: ${styles.height || "auto"};
    z-index: ${styles.zIndex || 1};
    transform: ${styles.transform || "none"};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  `;

  switch (type) {
    case "text": {
      // Create a container that matches editor exactly
      const textContainer = document.createElement("div");
      textContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: ${buildSpacing(styles, "padding") || "0"};
        background-color: ${styles.backgroundColor || "transparent"};
        border-radius: ${styles.borderRadius || "0"};
        border: ${getBorderStyles(styles)};
        box-shadow: ${styles.boxShadow || "none"};
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: ${
          styles.textAlign === "center"
            ? "center"
            : styles.textAlign === "right"
            ? "flex-end"
            : "flex-start"
        };
      `;

      const textNode = document.createElement("div");
      textNode.textContent = element.content || "Text content";
      const textWeight = normalizeWeight(styles.fontWeight);
      textNode.style.cssText = `
        margin: 0;
        padding: 0;
        font-size: ${styles.fontSize || "16px"};
        font-weight: ${textWeight};
        font-variation-settings: "wght" ${textWeight};
        font-style: ${styles.fontStyle || "normal"};
        text-decoration: ${styles.textDecoration || "none"};
        color: ${styles.color || "#333333"};
        line-height: ${styles.lineHeight || "1.6"};
        text-align: ${getConsistentTextAlign(styles.textAlign || "left")};
        text-shadow: ${styles.textShadow || "none"};
        letter-spacing: ${styles.letterSpacing || "normal"};
        word-spacing: ${styles.wordSpacing || "normal"};
        text-indent: ${styles.textIndent || "0"};
        text-transform: ${styles.textTransform || "none"};
        vertical-align: baseline;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-break: break-word;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: ${
          styles.fontFamily || globalSettings?.fontFamily || "Arial, sans-serif"
        };
        opacity: ${styles.opacity || "1"};
        width: ${
          styles.textAlign === "center" || styles.textAlign === "right"
            ? "auto"
            : "100%"
        };
      `;

      stripLayoutTransforms(textNode);
      stripLayoutTransforms(textContainer);
      textContainer.appendChild(textNode);
      div.appendChild(textContainer);
      break;
    }

    case "header": {
      // Create a container that matches editor exactly
      const headerContainer = document.createElement("div");
      headerContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: ${buildSpacing(styles, "padding") || "0"};
        background-color: ${styles.backgroundColor || "transparent"};
        border-radius: ${styles.borderRadius || "0"};
        border: ${getBorderStyles(styles)};
        box-shadow: ${styles.boxShadow || "none"};
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: ${
          styles.textAlign === "center"
            ? "center"
            : styles.textAlign === "right"
            ? "flex-end"
            : "flex-start"
        };
      `;

      const headerNode = document.createElement("h2");
      headerNode.textContent = element.content || "Header";
      const headerWeight = normalizeWeight(styles.fontWeight);
      headerNode.style.cssText = `
        margin: 0;
        padding: 0;
        font-size: ${styles.fontSize || "28px"};
        font-weight: ${headerWeight};
        font-variation-settings: "wght" ${headerWeight};
        font-style: ${styles.fontStyle || "normal"};
        text-decoration: ${styles.textDecoration || "none"};
        color: ${styles.color || "#1a1a1a"};
        line-height: ${styles.lineHeight || "1.4"};
        text-align: ${getConsistentTextAlign(styles.textAlign || "left")};
        text-shadow: ${styles.textShadow || "none"};
        letter-spacing: ${styles.letterSpacing || "normal"};
        word-spacing: ${styles.wordSpacing || "normal"};
        text-indent: ${styles.textIndent || "0"};
        text-transform: ${styles.textTransform || "none"};
        vertical-align: baseline;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-break: break-word;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: ${
          styles.fontFamily || globalSettings?.fontFamily || "Arial, sans-serif"
        };
        opacity: ${styles.opacity || "1"};
        width: ${
          styles.textAlign === "center" || styles.textAlign === "right"
            ? "auto"
            : "100%"
        };
      `;

      stripLayoutTransforms(headerNode);
      stripLayoutTransforms(headerContainer);
      headerContainer.appendChild(headerNode);
      div.appendChild(headerContainer);
      break;
    }

    case "image": {
      const imgBox = document.createElement("div");
      imgBox.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* critical */
    background: transparent;
    border-radius: ${styles.borderRadius || "0"};
    border: ${getBorderStyles(styles)};
    box-shadow: ${styles.boxShadow || "none"};
    opacity: ${styles.opacity || "1"};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

      const img = document.createElement("img");
      img.src = content || "";
      img.alt = "Newsletter Image";
      img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: ${styles.objectFit || "cover"};
    display: block;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-sizing: border-box;
  `;

      stripLayoutTransforms(img);
      stripLayoutTransforms(imgBox);
      imgBox.appendChild(img);
      div.appendChild(imgBox);
      break;
    }

    case "button": {
      // Create outer container that matches the element dimensions
      const outerContainer = document.createElement("div");
      outerContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: ${buildSpacing(styles, "margin") || "0"};
        padding: 0;
        box-sizing: border-box;
      `;

      // Create button container with exact flex alignment
      const buttonContainer = document.createElement("div");
      buttonContainer.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: ${
          styles.textAlign === "left" || !styles.textAlign
            ? "flex-start"
            : styles.textAlign === "right"
            ? "flex-end"
            : "center"
        };
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: transparent;
      `;

      // Create the actual button with all styling
      const button = document.createElement("a");
      button.href = link || "#";
      button.textContent = content || "Button";
      button.style.cssText = `
        padding: ${buildSpacing(styles, "padding") || "12px 24px"};
        text-decoration: none;
        display: inline-block;
        text-align: center;
        border-radius: ${styles.borderRadius || "6px"};
        background-color: ${styles.backgroundColor || "#007bff"};
        color: ${styles.color || "#fff"};
        border: ${getBorderStyles(styles)};
        font-size: ${styles.fontSize || "16px"};
        font-weight: ${normalizeWeight(styles.fontWeight) || "400"};
        font-style: ${styles.fontStyle || "normal"};
        text-shadow: ${styles.textShadow || "none"};
        font-family: ${
          styles.fontFamily || globalSettings?.fontFamily || "Arial, sans-serif"
        };
        box-shadow: ${styles.boxShadow || "none"};
        opacity: ${styles.opacity || "1"};
        margin: 0;
        min-width: ${styles.minWidth || "100px"};
        width: ${styles.width === "100%" ? "100%" : "auto"};
        box-sizing: border-box;
        letter-spacing: ${styles.letterSpacing || "normal"};
        word-spacing: ${styles.wordSpacing || "normal"};
        text-transform: ${styles.textTransform || "none"};
        line-height: ${styles.lineHeight || "1.4"};
        vertical-align: baseline;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        white-space: nowrap;
        overflow-wrap: break-word;
      `;

      stripLayoutTransforms(button);
      stripLayoutTransforms(buttonContainer);
      stripLayoutTransforms(outerContainer);

      buttonContainer.appendChild(button);
      outerContainer.appendChild(buttonContainer);
      div.appendChild(outerContainer);
      break;
    }

    case "divider": {
      const dividerContainer = document.createElement("div");
      dividerContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: ${styles.height || "20px"};
        display: flex;
        align-items: center;
        justify-content: ${
          styles.textAlign === "left"
            ? "flex-start"
            : styles.textAlign === "right"
            ? "flex-end"
            : "center"
        };
        padding: ${buildSpacing(styles, "padding") || "0"};
        background-color: ${styles.backgroundColor || "transparent"};
        box-sizing: border-box;
      `;

      const line = document.createElement("div");
      line.style.cssText = `
        width: 100%;
        border-bottom: ${
          styles.borderBottomWidth || styles.borderWidth || "2px"
        } ${styles.borderBottomStyle || styles.borderStyle || "solid"} ${
        styles.borderColor || styles.backgroundColor || "#d1d5db"
      };
        height: 1px;
      `;

      stripLayoutTransforms(dividerContainer);
      dividerContainer.appendChild(line);

      if (content) {
        const text = document.createElement("span");
        text.textContent = content;
        text.style.cssText = `
          position: absolute;
          display: inline-block;
          padding: 0 12px;
          background-color: ${globalSettings?.newsletterColor || "white"};
          font-size: ${styles.fontSize || "14px"};
          color: ${styles.color || "#666"};
          font-family: ${
            styles.fontFamily ||
            globalSettings?.fontFamily ||
            "Arial, sans-serif"
          };
        `;
        dividerContainer.appendChild(text);
      }

      div.appendChild(dividerContainer);
      break;
    }

    case "social": {
      const socialContainer = document.createElement("div");
      socialContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: ${
          styles.textAlign === "left"
            ? "flex-start"
            : styles.textAlign === "right"
            ? "flex-end"
            : "center"
        };
        padding: ${buildSpacing(styles, "padding") || "16px"};
        background-color: ${styles.backgroundColor || "transparent"};
        border-radius: ${styles.borderRadius || "0"};
        border: ${getBorderStyles(styles)};
        box-shadow: ${styles.boxShadow || "none"};
        box-sizing: border-box;
      `;

      const iconsContainer = document.createElement("div");
      iconsContainer.style.cssText = `
        display: flex;
        gap: ${styles.gap || "12px"};
      `;

      if (icons && icons.length > 0) {
        icons.forEach((icon) => {
          const link = document.createElement("a");
          link.href = icon.url || "#";
          link.style.cssText = `
            color: ${styles.iconColor || styles.color || "#666"};
            text-decoration: none;
            display: inline-block;
            font-size: 24px;
            line-height: 1;
          `;
          link.textContent = "●"; // Placeholder for social icon
          iconsContainer.appendChild(link);
        });
      }

      stripLayoutTransforms(socialContainer);
      socialContainer.appendChild(iconsContainer);
      div.appendChild(socialContainer);
      break;
    }

    case "section": {
      const section = document.createElement("div");
      section.style.cssText = `
        position: relative;
        width: 100%;
        background-color: ${styles.backgroundColor || "#f9f9f9"};
        border: ${getBorderStyles(styles)};
        border-radius: ${styles.borderRadius || "8px"};
        padding: ${buildSpacing(styles, "padding") || "20px"};
        margin: ${buildSpacing(styles, "margin") || "20px 0"};
        box-shadow: ${styles.boxShadow || "none"};
        display: block;
        box-sizing: border-box;
      `;

      if (children && children.length > 0) {
        children.forEach((child, index) => {
          const childElement = createExportElement(child, globalSettings);
          if (childElement) {
            childElement.style.position = "relative";
            childElement.style.marginBottom = "16px";
            section.appendChild(childElement);
          }
        });
      }

      stripLayoutTransforms(section);
      return section;
    }

    default:
      const unknown = document.createElement("div");
      unknown.textContent = `Unknown element: ${type}`;
      unknown.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        color: #999;
        font-family: Arial, sans-serif;
        font-size: 14px;
        padding: 8px;
        box-sizing: border-box;
      `;
      stripLayoutTransforms(unknown);
      div.appendChild(unknown);
      break;
  }

  return div;
};

// Hover wrapper with Tailwind classes for blue outline and tooltip
const EditableWrapper = ({
  element,
  isEditable,
  tooltip,
  children,
  onDoubleClick,
}) => (
  <div
    data-element-id={element.id}
    tabIndex={isEditable ? 0 : -1}
    onDoubleClick={onDoubleClick}
    className={
      isEditable
        ? "relative outline-none group cursor-pointer"
        : "relative outline-none"
    }
  >
    {/* Blue outline and halo on hover */}
    <div className="pointer-events-none absolute -inset-0.5 rounded-md opacity-0 transition-opacity duration-150 group-hover:opacity-100 ring-2 ring-blue-500/80 ring-offset-2 ring-offset-blue-200/40" />
    {children}
    {isEditable && tooltip && (
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/90 text-white text-[11px] leading-none px-2.5 py-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 whitespace-nowrap">
        {tooltip}
      </span>
    )}
  </div>
);

// Improved ResizableElementWrapper with better size handling
const ResizableElementWrapper = ({
  children,
  element,
  updateElement,
  selected,
  onSelect,
  activeView,
}) => {
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [handleType, setHandleType] = useState(null);

  // Only apply positioning for non-section elements in editor mode
  const shouldUseAbsolutePositioning =
    (activeView === "editor" || activeView === "preview") &&
    element.type !== "section";

  const onMouseDown = (e, type) => {
    if (activeView !== "editor") return;

    e.stopPropagation();
    setIsResizing(true);
    setHandleType(type);
    setStartPos({ x: e.clientX, y: e.clientY });

    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setStartSize({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setHandleType(null);
  };

  const onMouseMove = (e) => {
    if (!isResizing || !elementRef.current || activeView !== "editor") return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    let newWidth = startSize.width;
    let newHeight = startSize.height;

    // Handle different resize directions
    switch (handleType) {
      case "top-left":
        newWidth = Math.max(50, startSize.width - dx);
        newHeight = Math.max(30, startSize.height - dy);
        break;
      case "top-right":
        newWidth = Math.max(50, startSize.width + dx);
        newHeight = Math.max(30, startSize.height - dy);
        break;
      case "bottom-left":
        newWidth = Math.max(50, startSize.width - dx);
        newHeight = Math.max(30, startSize.height + dy);
        break;
      case "bottom-right":
        newWidth = Math.max(50, startSize.width + dx);
        newHeight = Math.max(30, startSize.height + dy);
        break;
      case "top":
        newHeight = Math.max(30, startSize.height - dy);
        break;
      case "right":
        newWidth = Math.max(50, startSize.width + dx);
        break;
      case "bottom":
        newHeight = Math.max(30, startSize.height + dy);
        break;
      case "left":
        newWidth = Math.max(50, startSize.width - dx);
        break;
      default:
        break;
    }

    updateElement(element.id, {
      styles: {
        ...element.styles,
        width: `${newWidth}px`,
        height:
          element.type === "divider"
            ? element.styles?.height
            : `${newHeight}px`,
      },
    });
  };

  const onDragMouseDown = (e) => {
    if (activeView !== "editor") return;

    e.stopPropagation();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const onDragMouseMove = (e) => {
    if (!isDragging || isResizing || activeView !== "editor") return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    const currentLeft = parseFloat(element.styles?.left) || 0;
    const currentTop = parseFloat(element.styles?.top) || 0;

    updateElement(element.id, {
      styles: {
        ...element.styles,
        left: `${currentLeft + dx}px`,
        top: `${currentTop + dy}px`,
      },
    });

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (activeView !== "editor") return;

    const handleMouseMove = (e) => {
      onMouseMove(e);
      onDragMouseMove(e);
    };

    const handleMouseUp = () => {
      onMouseUp();
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, activeView]);

  const resizeHandles = [
    { type: "top-left", className: "top-0 left-0 cursor-nwse-resize" },
    {
      type: "top",
      className: "top-0 left-1/2 -translate-x-1/2 cursor-ns-resize",
    },
    { type: "top-right", className: "top-0 right-0 cursor-nesw-resize" },
    {
      type: "right",
      className: "top-1/2 right-0 -translate-y-1/2 cursor-ew-resize",
    },
    { type: "bottom-right", className: "bottom-0 right-0 cursor-nwse-resize" },
    {
      type: "bottom",
      className: "bottom-0 left-1/2 -translate-x-1/2 cursor-ns-resize",
    },
    { type: "bottom-left", className: "bottom-0 left-0 cursor-nesw-resize" },
    {
      type: "left",
      className: "top-1/2 left-0 -translate-y-1/2 cursor-ew-resize",
    },
  ];

  const wrapperStyles = shouldUseAbsolutePositioning
    ? {
        position: "absolute",
        left: element.styles?.left || "20px",
        top: element.styles?.top || "20px",
        width: element.styles?.width || "auto",
        height: element.styles?.height || "auto",
        zIndex: selected ? 10 : 1,
      }
    : {
        position: "relative",
        width: element.styles?.width || "100%",
        height: element.styles?.height || "auto",
        margin: element.styles?.margin || "0",
        padding: element.styles?.padding || "0",
      };

  return (
    <div
      className={`${
        selected && activeView === "editor" ? "ring-2 ring-blue-500" : ""
      } ${activeView === "editor" ? "cursor-pointer" : ""} element-container`}
      ref={elementRef}
      style={{ ...wrapperStyles, touchAction: "none" }}
      onMouseDown={(e) => {
        if (activeView === "editor") {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {/* Editor controls - only show in editor mode */}
      {selected && activeView === "editor" && (
        <>
          {/* Drag Handle - Left */}
          <div
            onMouseDown={onDragMouseDown}
            className="absolute top-1/2 -translate-y-1/2 left-[-30px] w-6 h-6 bg-blue-500 rounded cursor-move z-20 flex items-center justify-center text-white text-xs shadow"
            title="Drag element"
            style={{ userSelect: "none" }}
          >
            ⋮⋮
          </div>

          {/* Drag Handle - Right */}
          <div
            onMouseDown={onDragMouseDown}
            className="absolute top-1/2 -translate-y-1/2 right-[-30px] w-6 h-6 bg-blue-500 rounded cursor-move z-20 flex items-center justify-center text-white text-xs shadow"
            title="Drag element"
            style={{ userSelect: "none" }}
          >
            ⋮⋮
          </div>

          {/* Drag Handle - Top */}
          <div
            onMouseDown={onDragMouseDown}
            className="absolute left-1/2 -translate-x-1/2 top-[-30px] w-6 h-6 bg-blue-500 rounded cursor-move z-20 flex items-center justify-center text-white text-xs shadow"
            title="Drag element"
            style={{ userSelect: "none" }}
          >
            ⋯
          </div>

          {/* Drag Handle - Bottom */}
          <div
            onMouseDown={onDragMouseDown}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] w-6 h-6 bg-blue-500 rounded cursor-move z-20 flex items-center justify-center text-white text-xs shadow"
            title="Drag element"
            style={{ userSelect: "none" }}
          >
            ⋯
          </div>

          {/* Resize Handles - only for resizable elements */}
          {element.type !== "divider" &&
            resizeHandles.map((handle) => (
              <div
                key={handle.type}
                className={`absolute w-3 h-3 bg-blue-500 border border-white z-10 ${handle.className}`}
                onMouseDown={(e) => onMouseDown(e, handle.type)}
                style={{ userSelect: "none" }}
              />
            ))}
        </>
      )}

      {children}
    </div>
  );
};

export default function ElementRenderer({
  element,
  updateElement,
  handleImageUpload,
  selected,
  activeView,
  setSelectedElementId,
  globalSettings,
}) {
  const fileInputRef = useRef(null);
  const { id, type, content, styles, link, icons, children } = element;

  // ✅ CLEAN EXPORT FIX: Only apply editor helpers in editor mode
  const editorHelpers = activeView === "editor" ? "editor-border" : "";

  // Helper function to get complete styles including border properties
  const getCompleteStyles = (elementStyles) => {
    const baseStyles = { ...elementStyles };

    // Handle border properties
    if (elementStyles?.borderWidth && elementStyles?.borderColor) {
      baseStyles.border = `${elementStyles.borderWidth} solid ${elementStyles.borderColor}`;
    }

    // Ensure all common properties are preserved
    return {
      backgroundColor: baseStyles.backgroundColor,
      color: baseStyles.color,
      borderRadius: baseStyles.borderRadius,
      border: baseStyles.border,
      borderWidth: baseStyles.borderWidth,
      borderColor: baseStyles.borderColor,
      borderStyle: baseStyles.borderStyle,
      padding: baseStyles.padding,
      margin: baseStyles.margin,
      fontSize: baseStyles.fontSize,
      fontWeight: baseStyles.fontWeight,
      // Add these for text formatting:
      fontStyle: baseStyles.fontStyle,
      textDecoration: baseStyles.textDecoration,
      textShadow: baseStyles.textShadow,
      shadowOffsetX: baseStyles.shadowOffsetX,
      shadowOffsetY: baseStyles.shadowOffsetY,
      shadowBlurRadius: baseStyles.shadowBlurRadius,
      shadowColor: baseStyles.shadowColor,
      textAlign: baseStyles.textAlign,
      boxShadow: baseStyles.boxShadow,
      opacity: baseStyles.opacity,
      ...baseStyles,
    };
  };

  const renderContent = () => {
    // Content styles without positioning (handled by wrapper) but with complete styling
    const contentStyles = getCompleteStyles({
      ...styles,
      position: undefined,
      left: undefined,
      top: undefined,
      width: "100%",
      height: "100%",
    });

    const isEditable = activeView === "editor";

    switch (type) {
      case "section":
        return (
          <div
            className={`section-container ${
              activeView === "preview" ? "preview-section" : ""
            }`}
            style={{
              ...contentStyles,
              display: "block",
              backgroundColor: styles?.backgroundColor || "#f9f9f9",
              border:
                styles?.borderWidth && styles?.borderColor
                  ? `${styles.borderWidth} solid ${styles.borderColor}`
                  : styles?.border || "none",
              borderRadius: styles?.borderRadius || "8px",
              padding: buildSpacing(styles, "padding") || "20px",
              margin: styles?.margin || "20px 0",
              boxShadow: styles?.boxShadow || "none",
            }}
          >
            {children && children.length > 0 ? (
              <div className="section-content" style={{ display: "block" }}>
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="section-child"
                    style={{ marginBottom: "16px" }}
                  >
                    <ElementRenderer
                      element={child}
                      updateElement={(childId, newProps) => {
                        const updatedChildren = children.map((c) =>
                          c.id === childId ? { ...c, ...newProps } : c
                        );
                        updateElement(id, { children: updatedChildren });
                      }}
                      handleImageUpload={handleImageUpload}
                      selected={false}
                      activeView={activeView}
                      setSelectedElementId={setSelectedElementId}
                      globalSettings={globalSettings}
                    />
                  </div>
                ))}
              </div>
            ) : (
              activeView === "editor" && (
                <p className="text-gray-400 text-sm text-center py-8">
                  Empty Section
                </p>
              )
            )}
          </div>
        );

      case "text":
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Click to edit text"
          >
            <div
              contentEditable={isEditable}
              suppressContentEditableWarning
              className={
                isEditable ? "outline-none cursor-text" : "outline-none"
              }
              style={{
                ...contentStyles,
                backgroundColor: contentStyles.backgroundColor,
                color: contentStyles.color,
                borderRadius: contentStyles.borderRadius,
                border: contentStyles.border,
                padding: buildSpacing(contentStyles, "padding"),
                fontSize: contentStyles.fontSize,
                fontWeight: contentStyles.fontWeight,
                fontStyle: contentStyles.fontStyle,
                textDecoration: contentStyles.textDecoration,
                textShadow: contentStyles.textShadow,
                textAlign: getConsistentTextAlign(
                  contentStyles.textAlign || "left"
                ),
                boxShadow: contentStyles.boxShadow,
                lineHeight: contentStyles.lineHeight || "1.6",
                letterSpacing: contentStyles.letterSpacing || "normal",
                wordSpacing: contentStyles.wordSpacing || "normal",
                textIndent: contentStyles.textIndent || "0",
                textTransform: contentStyles.textTransform || "none",
                verticalAlign: "baseline",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                display: "block",
                boxSizing: "border-box",
              }}
              onBlur={(e) => {
                if (isEditable) {
                  updateElement(id, { content: e.currentTarget.textContent });
                }
              }}
            >
              {content || (isEditable ? "Enter your text here..." : null)}
            </div>
          </EditableWrapper>
        );

      case "header":
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Click to edit heading"
          >
            <h2
              contentEditable={isEditable}
              suppressContentEditableWarning
              className={
                isEditable ? "outline-none cursor-text" : "outline-none"
              }
              style={{
                ...contentStyles,
                backgroundColor: contentStyles.backgroundColor,
                color: contentStyles.color,
                borderRadius: contentStyles.borderRadius,
                border: contentStyles.border,
                padding: buildSpacing(contentStyles, "padding"),
                fontSize: contentStyles.fontSize,
                fontWeight: contentStyles.fontWeight,
                fontStyle: contentStyles.fontStyle,
                textDecoration: contentStyles.textDecoration,
                textShadow: contentStyles.textShadow,
                textAlign: getConsistentTextAlign(
                  contentStyles.textAlign || "left"
                ),
                boxShadow: contentStyles.boxShadow,
                lineHeight: contentStyles.lineHeight || "1.4",
                letterSpacing: contentStyles.letterSpacing || "normal",
                wordSpacing: contentStyles.wordSpacing || "normal",
                textIndent: contentStyles.textIndent || "0",
                textTransform: contentStyles.textTransform || "none",
                verticalAlign: "baseline",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                display: "block",
                boxSizing: "border-box",
                margin: 0,
              }}
              onBlur={(e) => {
                if (isEditable) {
                  updateElement(id, { content: e.currentTarget.textContent });
                }
              }}
            >
              {content || (isEditable ? "Header Text" : null)}
            </h2>
          </EditableWrapper>
        );

      case "image": {
        const isEditable = activeView === "editor";
        const isImagePresent =
          content &&
          (content.startsWith("data:") || content.startsWith("http"));
        const onDblClick = () => {
          if (!isBrowser() || !isEditable) return;
          const ev = new CustomEvent("open-image-upload", { detail: { id } });
          window.dispatchEvent(ev);
        };

        const boxWidth = styles?.width || "300px";
        const boxHeight = styles?.height || "200px";
        const fit = styles?.objectFit || "cover"; // contain | cover | fill | none | scale-down

        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Double‑click to change"
            onDoubleClick={onDblClick}
          >
            <div
              className={`image-element ${editorHelpers}`}
              style={{
                position: "relative",
                width: boxWidth,
                height: boxHeight,
                backgroundColor: "transparent",
                border:
                  styles?.borderWidth && styles?.borderColor
                    ? `${styles.borderWidth} solid ${styles.borderColor}`
                    : styles?.border || "none",
                borderRadius: styles?.borderRadius || 0,
                boxShadow: styles?.boxShadow || "none",
                opacity: styles?.opacity ?? 1,
                overflow: "hidden", // critical
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: element.styles?.transform || "none",
                transformOrigin: element.styles?.transformOrigin || "center center",
              }}
            >
              {isImagePresent ? (
                <img
                  src={content}
                  alt="Newsletter"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: fit,
                    display: "block",
                  }}
                />
              ) : (
                isEditable && (
                  <div className="text-gray-500 text-center pointer-events-none">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Double-click to add image</p>
                  </div>
                )
              )}
              {isEditable && (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleImageUpload(id, file);
                  }}
                />
              )}
            </div>
          </EditableWrapper>
        );
      }

      case "button":
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Click to edit button text"
          >
            <div
              className={`button-container ${editorHelpers}`}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  contentStyles.textAlign === "left" || !contentStyles.textAlign
                    ? "flex-start"
                    : contentStyles.textAlign === "right"
                    ? "flex-end"
                    : "center",
                padding: "0",
                margin: buildSpacing(contentStyles, "margin") || "0",
                backgroundColor: "transparent",
                boxSizing: "border-box",
              }}
            >
              <a
                href={link || "#"}
                style={{
                  padding:
                    buildSpacing(contentStyles, "padding") || "12px 24px",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  borderRadius: contentStyles.borderRadius || "6px",
                  backgroundColor: contentStyles.backgroundColor || "#007bff",
                  color: contentStyles.color || "#fff",
                  border:
                    contentStyles.borderWidth && contentStyles.borderColor
                      ? `${contentStyles.borderWidth} solid ${contentStyles.borderColor}`
                      : contentStyles.border || "none",
                  fontSize: contentStyles.fontSize || "16px",
                  fontWeight: contentStyles.fontWeight || "400",
                  fontStyle: contentStyles.fontStyle || "normal",
                  textShadow: contentStyles.textShadow || "none",
                  fontFamily:
                    contentStyles.fontFamily ||
                    globalSettings?.fontFamily ||
                    "Arial, sans-serif",
                  boxShadow: contentStyles.boxShadow || "none",
                  opacity: contentStyles.opacity || "1",
                  cursor: activeView === "preview" ? "pointer" : "default",
                  minWidth: contentStyles.minWidth || "100px",
                  width: contentStyles.width === "100%" ? "100%" : "auto",
                  margin: "0",
                  boxSizing: "border-box",
                  letterSpacing: contentStyles.letterSpacing || "normal",
                  wordSpacing: contentStyles.wordSpacing || "normal",
                  textTransform: contentStyles.textTransform || "none",
                  lineHeight: contentStyles.lineHeight || "1.4",
                  verticalAlign: "baseline",
                  textRendering: "geometricPrecision",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  whiteSpace: "nowrap",
                  overflowWrap: "break-word",
                }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable && updateElement) {
                    updateElement(id, { content: e.currentTarget.textContent });
                  }
                }}
                onClick={(e) => {
                  if (isEditable) {
                    e.preventDefault();
                  }
                }}
                target={activeView === "preview" ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {content || (isEditable ? "Button" : null)}
              </a>
            </div>
          </EditableWrapper>
        );

      case "divider":
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Divider element"
          >
            <div
              className={`divider-element ${editorHelpers}`}
              style={{
                width: "100%",
                height: contentStyles.height || "20px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  contentStyles.textAlign === "left"
                    ? "flex-start"
                    : contentStyles.textAlign === "right"
                    ? "flex-end"
                    : "center",
                position: "relative",
                padding: buildSpacing(contentStyles, "padding"),
                backgroundColor: contentStyles.backgroundColor,
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderBottom: `${
                    styles?.borderBottomWidth || styles?.borderWidth || "2px"
                  } ${
                    styles?.borderBottomStyle || styles?.borderStyle || "solid"
                  } ${
                    styles?.borderColor || styles?.backgroundColor || "#d1d5db"
                  }`,
                  height: "1px",
                }}
              />
              {content && (
                <span
                  style={{
                    position: "absolute",
                    display: "inline-block",
                    padding: "0 12px",
                    backgroundColor: globalSettings?.newsletterColor || "white",
                    fontSize: contentStyles.fontSize || "14px",
                    color: contentStyles.color || "#666",
                  }}
                >
                  {content}
                </span>
              )}
            </div>
          </EditableWrapper>
        );

      case "social":
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Social media icons"
          >
            <div
              className={`social-element ${editorHelpers}`}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  contentStyles.textAlign === "left"
                    ? "flex-start"
                    : contentStyles.textAlign === "right"
                    ? "flex-end"
                    : "center",
                padding: buildSpacing(contentStyles, "padding") || "16px",
                backgroundColor: contentStyles.backgroundColor,
                borderRadius: contentStyles.borderRadius,
                border: contentStyles.border,
                boxShadow: contentStyles.boxShadow,
              }}
            >
              <div
                className="social-icons-container"
                style={{
                  display: "flex",
                  gap: styles?.gap || "12px",
                }}
              >
                {icons && icons.length > 0
                  ? icons.map((icon) => (
                      <a
                        key={icon.id}
                        href={icon.url || "#"}
                        target={activeView === "preview" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        style={{
                          color:
                            styles?.iconColor || contentStyles.color || "#666",
                          textDecoration: "none",
                          display: "inline-block",
                          transition: "opacity 0.2s ease",
                        }}
                        className="social-icon hover:opacity-75"
                        onClick={(e) => isEditable && e.preventDefault()}
                      >
                        {getIconComponent(icon.platform)}
                      </a>
                    ))
                  : isEditable && (
                      <p className="text-gray-500 text-sm">
                        No social icons added. Use the sidebar to add them.
                      </p>
                    )}
              </div>
            </div>
          </EditableWrapper>
        );

      default:
        return (
          <EditableWrapper
            element={element}
            isEditable={isEditable}
            tooltip="Unknown element"
          >
            <div className={`${editorHelpers}`} style={contentStyles}>
              <p className="text-gray-500">Unknown element type: {type}</p>
            </div>
          </EditableWrapper>
        );
    }
  };

  return (
    <ResizableElementWrapper
      element={element}
      updateElement={updateElement}
      handleImageUpload={handleImageUpload}
      selected={selected}
      onSelect={() => {
        if (activeView === "editor") {
          setSelectedElementId(element.id);
        }
      }}
      activeView={activeView}
    >
      {renderContent()}
    </ResizableElementWrapper>
  );
}

// Export the essential functions that need to be accessible
export {
  createExportElement,
  ensureFontsLoaded,
  stripLayoutTransforms,
  getConsistentTextAlign,
  normalizeWeight,
  getBorderStyles,
  buildSpacing,
};
