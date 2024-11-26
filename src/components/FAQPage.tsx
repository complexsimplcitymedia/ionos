import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "How long does a vehicle wrap typically last?",
      answer: "A professional vehicle wrap typically lasts 5-7 years with proper care and maintenance. We use premium materials and offer a 5-year warranty on our installations."
    },
    {
      question: "What's the difference between a wrap and paint?",
      answer: "While both can transform your vehicle's appearance, wraps offer more design flexibility, are typically more cost-effective, protect the original paint, and can be removed without damage. Paint provides a traditional finish and might be preferred for certain custom looks."
    },
    {
      question: "How long does the installation process take?",
      answer: "A full vehicle wrap typically takes 3-5 business days, while partial wraps may take 1-2 days. Custom paint jobs usually require 5-7 days. Timeline can vary based on design complexity and vehicle size."
    },
    {
      question: "Can I wash my wrapped vehicle?",
      answer: "Yes, but we recommend hand washing with pH-neutral car soap. Avoid automatic car washes with brushes. Wait at least 2 weeks after installation before the first wash."
    },
    {
      question: "Do you offer warranties?",
      answer: "Yes, we provide a 5-year warranty on our wrap installations and paint jobs. This covers material defects and installation-related issues under normal use conditions."
    },
    {
      question: "What types of vehicles do you work with?",
      answer: "We work with all vehicle types including cars, trucks, SUVs, motorcycles, boats, and commercial fleet vehicles. Our facility can accommodate vehicles of various sizes."
    },
    {
      question: "How should I maintain my wrapped vehicle?",
      answer: "Keep your vehicle clean, hand wash with appropriate products, avoid parking in direct sunlight for prolonged periods, clean bird droppings and other contaminants promptly, and follow our detailed care guide."
    },
    {
      question: "Can you wrap leased vehicles?",
      answer: "Yes, vehicle wraps can be safely removed without damaging the original paint, making them perfect for leased vehicles. Just ensure your lease agreement allows for temporary modifications."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Auto Customization FAQs | Kustom Auto Wrx Gainesville
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert Answers to Your Vehicle Customization Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openQuestion === index ? (
                  <Minus className="w-5 h-5 text-blue-400" />
                ) : (
                  <Plus className="w-5 h-5 text-blue-400" />
                )}
              </button>
              {openQuestion === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}