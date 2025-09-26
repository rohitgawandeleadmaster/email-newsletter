import React, { useState } from "react";

const templatesData = [
  {
    category: "Real Estate",
    color: "bg-green-500",
    templates: [
      { title: "New Property Listing (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/d1fae5/065f46?text=New+Property", link: "https://email-newsletter-tan.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758865040%2Fnewsletter_1758865041034"},
      { title: "Limited-Time Offer (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/a7f3d0/047857?text=Limited+Offer", link: "https://email-newsletter-tan.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758867006%2Fnewsletter_1758867007723" },
      { title: "Monthly Newsletter (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/6ee7b7/059669?text=Monthly+Newsletter", link: "https://email-newsletter-tan.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758868499%2Fnewsletter_1758868500757" },
      // { title: "Quick Offer Alert (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/dcfce7/4338ca?text=Quick+Offer", link: "#" },
      // { title: "Site Visit Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/bbf7d0/4338ca?text=Site+Visit", link: "#" },
    ],
  },
  {
    category: "Financial Services",
    color: "bg-indigo-500",
    templates: [
      { title: "Product Promo (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/c7d2fe/3730a3?text=Product+Promo", link: "#" },
      { title: "Educational Drip Campaign (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/a5b4fc/4338ca?text=Educational+Campaign", link: "#" },
      { title: "Payment Reminder (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/818cf8/4f46e5?text=Payment+Reminder", link: "#" },
      // { title: "KYC/Payment Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/e0e7ff/4338ca?text=KYC+Reminder", link: "#" },
      // { title: "New Product Alert (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/bfdbfe/4338ca?text=New+Product+Alert", link: "#" },
    ],
  },
  {
    category: "Healthcare & Wellness",
    color: "bg-teal-500",
    templates: [
      { title: "Health Camp Invite (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/ccfbf1/0f766e?text=Health+Camp", link: "https://email-newsletter-rcg1wxpu5-rohitgawandeleadmasters-projects.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758539939%2Fnewsletter_1758539939142" },
      { title: "Service Promotion (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/99f6e4/0d9488?text=Service+Promo", link: "https://email-newsletter-tan.vercel.app/?template=https%3A%2F%2Fres.cloudinary.com%2Fdhlex64es%2Fraw%2Fupload%2Fv1758623030%2Fnewsletter_1758623031243" },
      { title: "Wellness Newsletter (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/5eead4/0d9488?text=Wellness+Newsletter", link: "#" },
      // { title: "Appointment Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/c7f6f1/4338ca?text=Appointment+Reminder", link: "#" },
      // { title: "Lab/Test Result Updates (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/a8f0ed/4338ca?text=Lab+Results", link: "#" },
    ],
  },
  {
    category: "Education & Training",
    color: "bg-blue-500",
    templates: [
      { title: "Course Enrollment (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/bfdbfe/1e40af?text=Course+Enrollment", link: "#" },
      { title: "Open House/Webinar Invite (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/c7d2fe/3730a3?text=Webinar+Invite", link: "#" },
      { title: "Student Success Story (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/e0e7ff/4338ca?text=Student+Success", link: "#" },
      // { title: "Inquiry Follow-up (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/e0e7ff/4338ca?text=Inquiry+Followup", link: "#" },
      // { title: "Webinar Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/bfdbfe/4338ca?text=Webinar+Reminder", link: "#" },
    ],
  },
  {
    category: "Retail & E-commerce",
    color: "bg-red-500",
    templates: [
      { title: "Promo Offer (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fecaca/991b1b?text=Promo+Offer", link: "#" },
      { title: "New Arrivals (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fbcfe8/be185d?text=New+Arrivals", link: "#" },
      { title: "Abandoned Cart Reminder (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fed7aa/ea580c?text=Abandoned+Cart", link: "#" },
      // { title: "Flash Sale Alert (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fecdd3/4338ca?text=Flash+Sale+Alert", link: "#" },
      // { title: "Product Catalog Showcase (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fbcfe8/4338ca?text=Product+Catalog", link: "#" },
    ],
  },
  {
    category: "Travel & Hospitality",
    color: "bg-cyan-500",
    templates: [
      { title: "Tour Package Promo (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/cffafe/0695ab?text=Tour+Package", link: "#" },
      { title: "Personalized Offers (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/a5f3fc/0891b2?text=Personalized+Offers", link: "#" },
      { title: "Booking Confirmation (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/67e8f9/06b6d4?text=Booking+Confirmation", link: "#" },
      // { title: "Reservation Confirm (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/cffafe/4338ca?text=Reservation+Confirm", link: "#" },
      // { title: "Flight/Trip Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/a5f3fc/4338ca?text=Flight+Reminder", link: "#" },
    ],
  },
  {
    category: "Technology & SaaS",
    color: "bg-purple-500",
    templates: [
      { title: "Product Demo Invite (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/e9d5ff/6b21a8?text=Product+Demo", link: "#" },
      { title: "Case Study/Whitepaper (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/d8b4fe/7e22ce?text=Case+Study", link: "#" },
      { title: "Onboarding Series (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/f3e8ff/a855f7?text=Onboarding+Series", link: "#" },
      // { title: "Trial Signup Follow-up (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/f3e8ff/4338ca?text=Trial+Followup", link: "#" },
      // { title: "Quick Support Check-in (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/d8b4fe/4338ca?text=Support+Checkin", link: "#" },
    ],
  },
  {
    category: "Media & Entertainment",
    color: "bg-pink-500",
    templates: [
      { title: "Event Promotion (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fce7f3/9d174d?text=Event+Promo", link: "#" },
      { title: "Content Recommendations (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fbcfe8/be185d?text=Content+Recs", link: "#" },
      { title: "Subscription Renewal (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/f9a8d4/db2777?text=Subscription+Renewal", link: "#" },
      // { title: "Event Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fbcfe8/4338ca?text=Event+Reminder", link: "#" },
      // { title: "New Content Alert (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fce7f3/4338ca?text=New+Content+Alert", link: "#" },
    ],
  },
  {
    category: "Automotive",
    color: "bg-gray-500",
    templates: [
      { title: "New Car Launch (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/e5e7eb/6b7280?text=New+Car+Launch", link: "#" },
      { title: "Promo Offer (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/d1d5db/6b7280?text=Promo+Offer", link: "#" },
      { title: "Follow-up Post-Inquiry (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/9ca3af/6b7280?text=Inquiry+Followup", link: "#" },
      // { title: "Service Camp Alert (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/d1d5db/4338ca?text=Service+Camp", link: "#" },
      // { title: "Test Drive Reminder (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/e5e7eb/4338ca?text=Test+Drive+Reminder", link: "#" },
    ],
  },
  {
    category: "Professional Services",
    color: "bg-yellow-500",
    templates: [
      { title: "Services Intro (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fef08a/b45309?text=Services+Intro", link: "#" },
      { title: "Case Study Newsletter (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fde047/a16207?text=Case+Study", link: "#" },
      { title: "Client Testimonial (Email)", type: "email", placeholderUrl: "https://placehold.co/400x300/fcd34d/d97706?text=Client+Testimonial", link: "#" },
      // { title: "Meeting Follow-up (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fef3c7/4338ca?text=Meeting+Followup", link: "#" },
      // { title: "Consultation Scheduling (WhatsApp)", type: "whatsapp", placeholderUrl: "https://placehold.co/400x300/fde047/4338ca?text=Consult+Scheduling", link: "#" },
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
            Choose from a variety of professionally designed email newsletter and WhatsApp templates to get started.
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
                  ? `${section.color} text-white shadow-lg`
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
                  className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl group border border-gray-200"
                >
                  <a href={template.link} target="_blank" rel="noopener noreferrer" className="block relative">
                    <img
                      src={template.placeholderUrl}
                      alt={template.title}
                      className="w-full h-64 object-cover rounded-t-lg transition-opacity duration-300 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* <p className="text-white text-lg font-semibold">Click to Edit Template</p> */}
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
