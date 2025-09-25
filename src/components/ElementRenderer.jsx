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

// Improved ResizableElementWrapper with better size handling
const ResizableElementWrapper = ({
  children,
  element,
  updateElement,
  selected,
  onSelect,
  activeView,
  toggleStyle
  
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
  // Only show toolbar for text or header elements in editor
  const showToolbar =
    selected && activeView === "editor" && (element.type === "text" || element.type === "header");

 

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
      style={{ ...wrapperStyles, touchAction: "none" }} // prevents touch scrolling while dragging on touch devices
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
// ✅ Add toggleStyle here
  const toggleStyle = (property, value) => {
    const current = element.styles[property] || "";
    let newValue;

    if (property === "fontWeight" || property === "fontStyle" || property === "textDecoration") {
      newValue = current === value ? "normal" : value;
    } else {
      newValue = current ? "" : value; // for shadow, toggle on/off
    }

    updateElement(element.id, {
      styles: {
        ...element.styles,
        [property]: newValue,
      },
    });
  };
  // ✅ CLEAN EXPORT FIX: Only apply editor helpers in editor mode
  const editorHelpers = activeView === "editor" ? "editor-border" : "";
  // ✅ Helper to build spacing from individual properties
  const buildSpacing = (styles, property) => {
    const top = styles[`${property}Top`] || "0px";
    const right = styles[`${property}Right`] || "0px";
    const bottom = styles[`${property}Bottom`] || "0px";
    const left = styles[`${property}Left`] || "0px";

    // If all are the same, use shorthand
    if (top === right && right === bottom && bottom === left) {
      return top;
    }
    return `${top} ${right} ${bottom} ${left}`;
  };

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
      fontWeight: baseStyles.fontWeight, // bold support
    fontStyle: baseStyles.fontStyle, // italic support
    textDecoration: baseStyles.textDecoration, // underline, line-through
    textShadow: baseStyles.textShadow, // shadow string
      fontFamily: baseStyles.fontFamily || "inherit", // 👈 Add this
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
              padding: styles?.padding || "20px",
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
      //     <div style={{ position: "relative" }}>
      // {/* Toolbar for bold/italic/underline/shadow */}
      // {selected && activeView === "editor" && (
      //   <div className="text-toolbar flex gap-2 mb-1">
      //     <button onClick={() => toggleStyle("fontWeight", "bold")}>B</button>
      //     <button onClick={() => toggleStyle("fontStyle", "italic")}>I</button>
      //     <button onClick={() => toggleStyle("textDecoration", "underline")}>U</button>
      //     <button onClick={() => toggleStyle("textShadow", "2px 2px 4px rgba(0,0,0,0.3)")}>
      //       Shadow
      //     </button>
      //   </div>
      // )}
          <div
          
            contentEditable={activeView === "editor"}
            suppressContentEditableWarning
            className={`text-element outline-none ${editorHelpers}`}
            style={{
              ...contentStyles,
              backgroundColor: contentStyles.backgroundColor,
              color: contentStyles.color,
              borderRadius: contentStyles.borderRadius,
              border: contentStyles.border,
              padding: contentStyles.padding,
              fontSize: contentStyles.fontSize,
              fontWeight: contentStyles.fontWeight,
              textAlign: contentStyles.textAlign,
              boxShadow: contentStyles.boxShadow,
               fontWeight: contentStyles.fontWeight, // bold
        fontStyle: contentStyles.fontStyle, // italic
        textDecoration: contentStyles.textDecoration, // underline/line-through
        textShadow: contentStyles.textShadow, // shadow with color
            }}
            onBlur={(e) => {
              if (activeView === "editor") {
                updateElement(id, { content: e.currentTarget.textContent });
              }
            }}
          >
            {content ||
              (activeView === "editor" ? "Enter your text here..." : null)}
          </div>   
      
        );

      case "header":
        return (
          <h2
            className={`header-element outline-none ${editorHelpers}`}
            contentEditable={activeView === "editor"}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (activeView === "editor") {
                updateElement(id, { content: e.currentTarget.textContent });
              }
            }}
            style={{
              ...contentStyles,
              backgroundColor: contentStyles.backgroundColor,
              color: contentStyles.color,
              borderRadius: contentStyles.borderRadius,
              border: contentStyles.border,
              padding: contentStyles.padding,
              fontSize: contentStyles.fontSize,
              fontWeight: contentStyles.fontWeight,
              textAlign: contentStyles.textAlign,
              boxShadow: contentStyles.boxShadow,
               fontWeight: contentStyles.fontWeight, // bold
        fontStyle: contentStyles.fontStyle, // italic
        textDecoration: contentStyles.textDecoration, // underline/line-through
        textShadow: contentStyles.textShadow, // shadow with color
            }}
          >
            {content || (activeView === "editor" ? "Header Text" : null)}
          </h2>
        );

      case "image":
        const isImagePresent =
          content &&
          (content.startsWith("data:") || content.startsWith("http"));
        return (
          <div
            className={`image-element ${editorHelpers}`}
            onDoubleClick={() => {
              if (activeView === "editor" && fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            style={{
              ...contentStyles,
              textAlign: "center",
              border:
                styles?.borderWidth && styles?.borderColor
                  ? `${styles.borderWidth} solid ${styles.borderColor}`
                  : contentStyles.border,
              borderRadius: contentStyles.borderRadius,
              boxShadow: contentStyles.boxShadow,
              opacity: contentStyles.opacity || 1,
              backgroundColor: isImagePresent ? "transparent" : "transparent",
              padding: 0, // Remove any padding
              margin: 0, // Remove any margin
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: isImagePresent
                ? "auto"
                : activeView === "editor"
                ? "200px"
                : "auto",
              overflow: "hidden", // Ensure image fits within border
            }}
          >
            {isImagePresent ? (
              <img
                src={content}
                alt="Newsletter"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: styles?.objectFit || "cover",
                  maxWidth: "100%",
                  margin: 0,
                  padding: 0,
                  borderRadius: styles?.borderRadius || 0,
                  display: "block", // Remove any inline spacing
                }}
                draggable={false}
              />
            ) : (
              activeView === "editor" && (
                <div className="placeholder-content text-gray-500 text-center pointer-events-none">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>Double-click to add image</p>
                </div>
              )
            )}
            {activeView === "editor" && (
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
        );

      case "button":
        // ✅ Build proper spacing values from individual properties
        const buildButtonSpacing = (styles, property) => {
          const top = styles[`${property}Top`] || "0px";
          const right = styles[`${property}Right`] || "0px";
          const bottom = styles[`${property}Bottom`] || "0px";
          const left = styles[`${property}Left`] || "0px";

          // If all are the same, use shorthand
          if (top === right && right === bottom && bottom === left) {
            return top;
          }
          return `${top} ${right} ${bottom} ${left}`;
        };

        return (
          <div
            className={`button-container ${editorHelpers}`}
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
              // ✅ Remove container padding - let button handle its own spacing
              padding: "0",
              // ✅ Apply container margin if needed
              margin: buildButtonSpacing(contentStyles, "margin"),
            }}
          >
            <a
              href={link || "#"}
              style={{
                // ✅ Apply button's own padding correctly
                padding:
                  buildButtonSpacing(contentStyles, "padding") || "12px 24px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                borderRadius: contentStyles.borderRadius || "6px",
                backgroundColor: contentStyles.backgroundColor || "#007bff",
                color: contentStyles.color || "#fff",
                // ✅ Apply border only to button, not container
                border:
                  contentStyles.borderWidth && contentStyles.borderColor
                    ? `${contentStyles.borderWidth} solid ${contentStyles.borderColor}`
                    : contentStyles.border || "none",
                fontSize: contentStyles.fontSize,
                fontWeight: contentStyles.fontWeight,
                boxShadow: contentStyles.boxShadow,
                cursor: activeView === "preview" ? "pointer" : "default",
                minWidth: "100px",
                // ✅ Ensure no margin on the button itself
                margin: "0",
              }}
              contentEditable={activeView === "editor"}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (activeView === "editor" && updateElement) {
                  updateElement(id, { content: e.currentTarget.textContent });
                }
              }}
              onClick={(e) => {
                if (activeView === "editor") {
                  e.preventDefault();
                }
              }}
              target={activeView === "preview" ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {content || (activeView === "editor" ? "Button" : null)}
            </a>
          </div>
        );

      case "divider":
        return (
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
              padding: contentStyles.padding,
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
        );

      case "social":
        return (
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
              padding: contentStyles.padding || "16px",
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
                      onClick={(e) =>
                        activeView === "editor" && e.preventDefault()
                      }
                    >
                      {getIconComponent(icon.platform)}
                    </a>
                  ))
                : activeView === "editor" && (
                    <p className="text-gray-500 text-sm">
                      No social icons added. Use the sidebar to add them.
                    </p>
                  )}
            </div>
          </div>
        );

      default:
        return (
          <div className={`${editorHelpers}`} style={contentStyles}>
            <p className="text-gray-500">Unknown element type: {type}</p>
          </div>
        );
    }
  };

  return (
    <ResizableElementWrapper
      element={element}
      updateElement={updateElement}
      handleImageUpload={handleImageUpload}
      selected={selected}
      toggleStyle={toggleStyle} // ✅ Pass as prop
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
