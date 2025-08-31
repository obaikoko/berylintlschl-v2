import React from 'react';

const NewUsers = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Welcome to Beryl International Schools Calabar
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            <span className="italic text-blue-600 dark:text-blue-400 font-medium">
              &ldquo;Shaping Future Leaders, Inspiring Excellence&rdquo;
            </span>
            <br /><br />
            Beryl International Schools Calabar is dedicated to providing a
            world-class education in a nurturing and supportive environment. Our
            mission is to shape the leaders of tomorrow through a blend of academic
            excellence, personal development, and global awareness. With highly
            qualified teachers and state-of-the-art facilities, we ensure each child
            reaches their full potential.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-300">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Expert Teachers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewUsers;
