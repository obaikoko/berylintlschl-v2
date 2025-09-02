import Image from 'next/image';
import React from 'react';
import { Quote } from 'lucide-react';

const WhyChooseUs = () => {
  const testimonials = [
    {
      image: '/images/creche1.jpg',
      quote: "Beryl International School Calabar has been an incredible choice for our children. The teachers are dedicated, and the environment is warm and supportive. We've seen remarkable progress in our kids, both academically and personally.",
      author: "Ada O."
    },
    {
      image: '/images/class2.jpg',
      quote: "From the early years to secondary school, Beryl has nurtured our children's love for learning. The community here feels like family.",
      author: "Chinedu M."
    }
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Testimonials */}
        <div className="space-y-16 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    width={600}
                    height={400}
                    src={testimonial.image}
                    alt="Students at Beryl International School"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>

              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    What Parents and Students Say About Us
                  </h3>
                </div>
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <cite className="block text-blue-600 dark:text-blue-400 font-semibold">
                  – {testimonial.author}
                </cite>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default WhyChooseUs;
