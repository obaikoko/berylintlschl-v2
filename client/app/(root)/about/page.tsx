import About from '@/components/shared/home-page/about';
import Image from 'next/image';
import { 
  Award, 
  Heart, 
  Users, 
  Target, 
  BookOpen, 
  Globe,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'About Us - Beryl International Schools',
  description:
    'Learn more about Beryl International Schools, its mission, vision, values, and the excellent education provided to students in Calabar, Cross River State.',
  keywords:
    'About Beryl International Schools, Calabar school, school mission, school values, education in Calabar, Cross River State',
};

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Safety',
      description: 'We value a safe and secure learning environment.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Star,
      title: 'Uniqueness',
      description: 'Every child is unique, and their uniqueness should be valued.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BookOpen,
      title: 'Active Learning Environment',
      description: 'We value the "CAN DO" attitude, which nurtures a love for learning.',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const objectives = [
    'Provide opportunities for children to excel in sports and arts',
    'Emphasize science and technology education',
    'Provide a conducive environment for learning',
    'Offer personalized learning experiences for all to achieve',
    'Identify and satisfy the unique needs of each child',
    'Build trusted and healthy relationships so learners feel safe and comfortable',
    'Provide qualified and well-motivated teachers',
    'Foster resourceful, creative, and imaginative thinking in children',
    'Instill discipline and entrepreneurial instincts in children',
    'Prepare children for excellent interpersonal relations',
    'Build faith, moral, and social values to enable constructive judgment',
    'Encourage hard work and responsible behavior in learners'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          width={1920}
          height={600}
          src="/images/class3.jpg"
          className="w-full h-full object-cover"
          alt="About Beryl International Schools"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About Beryl International Schools
            </h1>
            <p className="text-xl md:text-2xl text-blue-200">
              Shaping Future Leaders, Inspiring Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Text Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Beryl International Schools is a premier educational institution
                  located in Ikot Eneobong, Calabar, Cross River State, Nigeria.
                  Offering a comprehensive curriculum from creche/nursery to secondary
                  levels, Beryl is dedicated to providing students with an enriching
                  and holistic educational experience.
                </p>
                <p>
                  The school&apos;s vision is to inspire excellence, fostering an
                  environment where students are encouraged to think critically,
                  creatively, and globally. With a focus on innovation and
                  inclusivity, Beryl International Schools aims to nurture future
                  leaders who will make meaningful contributions to society.
                </p>
                <p>
                  Beryl International School&apos;s core values—excellence, integrity,
                  respect, and community—form the foundation of its educational
                  philosophy. These values are evident in every aspect of the school,
                  from its strong academic programs to its emphasis on character
                  building and leadership.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  The birth of Beryl International Schools, Ikot-Eneobong Federal
                  Housing Estate is a supernatural one. God&apos;s grace and mercy
                  brought us here, and the same will sustain us and every activity
                  embarked upon.
                </p>
                <p>
                  This journey started on the 12th day of September, 2016 when the 
                  school resumed for its first session&apos;s academic activities with 
                  four pupils and four staff in three classrooms and three offices 
                  as a springboard.
                </p>
                <p>
                  To God&apos;s glory, today, Beryl International Schools has gotten all 
                  the approvals needed for its full and optimal operation and 
                  functionalities from Primary to Secondary levels, even as we expect 
                  to go higher in our quest for excellence and global recognition.
                </p>
              </div>
            </div>
          </div>

          {/* Head of Administration Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Head of Administration
              </h2>
              <div className="relative mb-6">
                <Image
                  width={400}
                  height={400}
                  src="/images/proprietress.jpg"
                  alt="Mrs. Edith Iwuji Nneka - Head of Administration"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Mrs. Edith Iwuji Nneka, the Head of Administration at Beryl
                  International Schools, is a seasoned educational leader with a
                  deep commitment to creating an environment where students thrive
                  both academically and personally.
                </p>
                <p>
                  With her extensive experience in academic and administrative roles, 
                  she ensures the smooth running of the school&apos;s operations and 
                  promotes the school&apos;s core values of excellence, integrity, and respect.
                </p>
              </div>
            </div>

            {/* Administrator Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Administrator
              </h2>
              <div className="relative mb-6">
                <Image
                  width={400}
                  height={400}
                  src="/images/admin2.jpg"
                  alt="Mr. Collins Ogoigbe - Administrator"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Mr. Collins Ogoigbe, the Administrator at Beryl International
                  Schools, plays a pivotal role in ensuring the effective management
                  of the school.
                </p>
                <p>
                  With a focus on operational excellence and student welfare, he 
                  supports the administrative team in delivering a top-quality 
                  educational experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision & Values Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-blue-100">
              The principles that guide our educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Our Motto</h3>
              <p className="text-blue-100">Citadel of Wisdom and Excellence</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Our Belief</h3>
              <p className="text-blue-100">God is the giver of knowledge.</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-blue-100">To nurture and build great leaders of tomorrow.</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-blue-100">Shaping Future Leaders, Inspiring Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Aims, Goals, and Objectives
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our comprehensive approach to education and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of our journey in shaping future leaders and inspiring excellence
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <About />
    </div>
  );
};

export default AboutPage;
