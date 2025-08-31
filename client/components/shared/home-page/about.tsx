import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Target } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Nurturing Environment',
      description: 'We create a warm, supportive atmosphere where every child feels valued and encouraged to grow.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Our school community fosters strong relationships between students, teachers, and parents.'
    },
    {
      icon: Target,
      title: 'Excellence Driven',
      description: 'We maintain high standards while ensuring each child reaches their full potential.'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            School Life
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A Rich and Dynamic School Experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              Beryl International School Calabar helps every child reach their full potential
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At Beryl International School Calabar, learning goes beyond the classroom. 
              We offer a vibrant school life filled with extracurricular activities such as 
              sports, music, art, and leadership programs. Students are encouraged to explore 
              their interests, develop new talents, and contribute to the school community 
              through clubs and societies. Our holistic approach ensures that every child 
              grows academically, socially, and emotionally.
            </p>
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Join us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-8">
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
