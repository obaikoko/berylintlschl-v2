import React from 'react';
import { FileText, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Onboarding = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Fill Out the Application Form',
      description: 'Start by completing our online application form or visiting our school to pick up a physical copy. Provide all the necessary information about your child and family.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Calendar,
      title: 'Schedule an Assessment and Campus Tour',
      description: 'Once your application is received, we\'ll invite your child for an age-appropriate assessment. You\'ll also get a chance to tour our facilities and meet our dedicated staff.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      title: 'Complete the Enrollment Process',
      description: 'After a successful assessment, finalize the enrollment by submitting the required documents and fees. Welcome to the Beryl International School family!',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-600 dark:text-blue-400 mb-2">
            Onboarding Steps
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Follow these three simple steps to join us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 z-0" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/admission" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            Start Your Application
            <CheckCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
