import React from 'react';
import { 
  Brain, 
  GraduationCap, 
  Building2, 
  Shield, 
  Globe, 
  Layers 
} from 'lucide-react';

const ServicesCards = () => {
  const services = [
    {
      icon: Brain,
      title: 'Holistic Education',
      description: 'We provide a balanced approach to education that nurtures academic excellence, creativity, and personal growth. Our curriculum is designed to build critical thinking skills while fostering social and emotional development.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GraduationCap,
      title: 'Experienced and Caring Teachers',
      description: 'Our highly qualified teachers are passionate about education and committed to each child\'s success. With personalized attention and a nurturing approach, we ensure that every student thrives.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Building2,
      title: 'State-of-the-Art Facilities',
      description: 'Our modern campus is equipped with advanced learning tools, spacious classrooms, science labs, a library, and sports facilities that create an engaging environment for all students.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Safe and Supportive Environment',
      description: 'We prioritize the safety and well-being of our students. With a secure campus, dedicated staff, and a culture of inclusivity and respect, we provide a comfortable space where every child can succeed.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Focus on Global Citizenship',
      description: 'At Beryl International School, we prepare students for the global stage. Through leadership programs, community service, and exposure to diverse cultures, our students develop a sense of responsibility and a global perspective.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Layers,
      title: 'A Strong Foundation for Every Age',
      description: 'From our Creche/Nursery to Secondary school, we offer a continuous educational journey that ensures students receive the best preparation at every stage of their development.',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the unique features that make Beryl International School the preferred choice for quality education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
