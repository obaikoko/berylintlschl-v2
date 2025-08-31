import React from 'react';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

const Services = () => {
  const educationLevels = [
    {
      icon: GraduationCap,
      title: 'Creche & Nursery Section',
      description: 'Our Creche and Nursery provide a safe and stimulating environment for the youngest learners to explore, grow, and build the foundations of their educational journey.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: BookOpen,
      title: 'Primary School (Grades 1-5)',
      description: 'In the primary school, we nurture curiosity and creativity. Our Grade 1-5 curriculum is designed to build strong academic skills in literacy, numeracy, science, and the arts.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Secondary School (JSS 1 - SSS 3)',
      description: 'Our secondary school equips students with the knowledge, skills, and confidence needed to excel in higher education and beyond.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '100+', label: 'Creche/Nursery' },
    { number: '200+', label: 'Grade Pupils' },
    { number: '400+', label: 'Secondary Students' }
  ];

  return (
    <>
      {/* Education Levels Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Tailored Education for Every Stage of Growth
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From early childhood to secondary education, we provide comprehensive learning experiences
              that nurture every aspect of your child&apos;s development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educationLevels.map((level, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${level.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <level.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {level.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {level.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Academic Excellence
            </h2>
            <p className="text-xl italic text-blue-600 dark:text-blue-400 mb-8">
              Building a Strong Academic Foundation
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Beryl International School&apos;s curriculum is aligned with both national and international standards, 
              ensuring that students receive a well-rounded education that prepares them for future success. 
              Our dedicated teachers utilize modern teaching methods to engage students in Mathematics, English, 
              Sciences, and the Humanities. With small class sizes, we offer personalized attention to every child, 
              fostering academic excellence at every level.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
