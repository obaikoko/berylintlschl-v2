import Onboarding from '@/components/shared/home-page/onboarding';
import React from 'react';
import AdmissionForm from './admission-form';
import { GraduationCap, Users, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Admission - Beryl International School',
  description:
    'Find out how to apply for admission to Beryl International School for nursery, primary, and secondary school in Calabar, Cross River State.',
  keywords:
    'Beryl International School admission, school enrollment, Calabar admissions, education in Cross River State, apply to Beryl International School',
};

const AdmissionPage = () => {
  const admissionInfo = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Join a community committed to academic excellence and holistic development.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Diverse Community',
      description: 'Be part of a diverse and inclusive community that celebrates uniqueness.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Flexible Programs',
      description: 'Choose from our comprehensive programs from creche to secondary levels.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-indigo-700/50" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full" />
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Admissions
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Join our community of excellence!
          </p>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Begin your child&apos;s journey towards academic excellence and personal growth 
            at Beryl International Schools
          </p>
        </div>
      </div>

      {/* Admission Info Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose Beryl International Schools?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover what makes us the preferred choice for quality education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {admissionInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <Onboarding />
      </div>

      {/* Admission Form Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <AdmissionForm />
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our admission team is here to help you with any questions about the application process
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-blue-100">+234 XXX XXX XXXX</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-blue-100">admissions@berylschools.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;