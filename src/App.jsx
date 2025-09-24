import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TemplateGallery from "./components/TemplateGallery";
import EmailNewsletterEditor from "./components/EmailNewsletterEditor";
import TemplateGallerySaved from "./components/SavedTemplates";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            {/* Route for the main editor page */}
            <Route path="/" element={<EmailNewsletterEditor />} />

            {/* Route for the new template gallery page */}
            <Route path="/templates" element={<TemplateGallery />} />
            {/* Route for the new template gallery page */}
            <Route path="/saved" element={<TemplateGallerySaved />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
