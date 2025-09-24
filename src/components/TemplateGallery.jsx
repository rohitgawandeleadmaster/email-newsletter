import React, { useState } from "react";

const templatesData = [
  {
    category: "Hospital",
    color: "bg-red-500",
    templates: [
      { title: "Patient Updates", imageUrl: "/images/hospital-1.jpg", placeholderUrl: "public/HealthCare1.png", link: "https://email-newsletter-rcg1wxpu5-rohitgawandeleadmasters-projects.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758539939%2Fnewsletter_1758539939142" },
      { title: "Health & Wellness", imageUrl: "/images/hospital-2.jpg", placeholderUrl: "public/HealthCare2.png", link: "https://email-newsletter-tan.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758623030%2Fnewsletter_1758623031243" },
      { title: "Emergency Services", imageUrl: "/images/hospital-3.jpg", placeholderUrl: "https://placehold.co/400x300/fed7aa/ea580c?text=hospital-3.jpg", link: "#" },
    ],
  },
  {
    category: "Education",
    color: "bg-blue-500",
    templates: [
      { title: "School Newsletter", imageUrl: "/images/education-1.jpg", placeholderUrl: "https://placehold.co/400x300/bfdbfe/1e40af?text=education-1.jpg", link: "#" },
      { title: "Parent-Teacher Updates", imageUrl: "/images/education-2.jpg", placeholderUrl: "https://placehold.co/400x300/c7d2fe/3730a3?text=education-2.jpg", link: "#" },
      { title: "Student Life", imageUrl: "/images/education-3.jpg", placeholderUrl: "https://placehold.co/400x300/e0e7ff/4338ca?text=education-3.jpg", link: "#" },
    ],
  },
  {
    category: "Ed Tech",
    color: "bg-purple-500",
    templates: [
      { title: "LMS Launch", imageUrl: "/images/edtech-1.jpg", placeholderUrl: "https://placehold.co/400x300/e9d5ff/6b21a8?text=edtech-1.jpg", link: "#" },
      { title: "Course Catalog", imageUrl: "/images/edtech-2.jpg", placeholderUrl: "https://placehold.co/400x300/d8b4fe/7e22ce?text=edtech-2.jpg", link: "#" },
      { title: "Feature Release", imageUrl: "/images/edtech-3.jpg", placeholderUrl: "https://placehold.co/400x300/f3e8ff/a855f7?text=edtech-3.jpg", link: "#" },
    ],
  },
  {
    category: "Retail",
    color: "bg-green-500",
    templates: [
      { title: "New Arrivals", imageUrl: "/images/retail-1.jpg", placeholderUrl: "https://placehold.co/400x300/d1fae5/065f46?text=retail-1.jpg", link: "#" },
      { title: "Seasonal Sale", imageUrl: "/images/retail-2.jpg", placeholderUrl: "https://placehold.co/400x300/a7f3d0/047857?text=retail-2.jpg", link: "#" },
      { title: "Weekly Promotions", imageUrl: "/images/retail-3.jpg", placeholderUrl: "https://placehold.co/400x300/6ee7b7/059669?text=retail-3.jpg", link: "#" },
    ],
  },
  {
    category: "Ecommerce",
    color: "bg-yellow-500",
    templates: [
      { title: "Abandoned Cart", imageUrl: "/images/ecommerce-1.jpg", placeholderUrl: "https://placehold.co/400x300/fef08a/b45309?text=ecommerce-1.jpg", link: "#" },
      { title: "Order Confirmation", imageUrl: "/images/ecommerce-2.jpg", placeholderUrl: "https://placehold.co/400x300/fde047/a16207?text=ecommerce-2.jpg", link: "#" },
      { title: "Product Showcase", imageUrl: "/images/ecommerce-3.jpg", placeholderUrl: "https://placehold.co/400x300/fcd34d/d97706?text=ecommerce-3.jpg", link: "#" },
    ],
  },
  {
    category: "Resorts",
    color: "bg-indigo-500",
    templates: [
      { title: "Booking Confirmation", imageUrl: "/images/resorts-1.jpg", placeholderUrl: "https://placehold.co/400x300/c7d2fe/3730a3?text=resorts-1.jpg", link: "#" },
      { title: "Exclusive Offers", imageUrl: "/images/resorts-2.jpg", placeholderUrl: "https://placehold.co/400x300/a5b4fc/4338ca?text=resorts-2.jpg", link: "#" },
      { title: "Upcoming Events", imageUrl: "/images/resorts-3.jpg", placeholderUrl: "https://placehold.co/400x300/818cf8/4f46e5?text=resorts-3.jpg", link: "#" },
    ],
  },
];

export default function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = selectedCategory === "All"
    ? templatesData
    : templatesData.filter(section => section.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 p-8 sm:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Template Gallery 🎨
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose from a variety of professionally designed email newsletter templates to get started.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
              selectedCategory === "All"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {templatesData.map((section, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(section.category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === section.category
                  ? `${section.color.replace('bg-', 'bg-')} text-white shadow-lg`
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Templates Section */}
        {filteredData.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 pl-4 rounded-sm" style={{ borderColor: section.color.replace('bg-', '') }}>
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.templates.map((template, templateIndex) => (
                <div
                  key={templateIndex}
                  className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <a href={template.link} target="_blank" rel="noopener noreferrer" className="block relative">
                    <img
                      src={template.placeholderUrl}
                      alt={template.title}
                      className="w-full h-200 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-lg font-semibold">Click to Edit</p>
                    </div>
                  </a>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 text-center">
                      {template.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
