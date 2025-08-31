'use client';

import { motion } from 'framer-motion';
import EventCard from '@/components/shared/events/event-card';
import { Card, CardContent } from '@/components/ui/card';
import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';
import Image from 'next/image';
import Spinner from '@/components/shared/spinner';
import { Calendar, Clock } from 'lucide-react';

const EventPage = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src="/images/sport1.jpg"
            alt="Events Background"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-200" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Upcoming Events
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Discover exciting events and activities happening at our school
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent"
        />
      </motion.div>

      {/* Main Content Section */}
      <div className="relative -mt-20 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center py-20"
            >
              <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Spinner />
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading events...</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center py-20"
            >
              <Card className="w-full max-w-md border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Unable to Load Events</h3>
                  <p className="text-red-600 dark:text-red-300 text-center">Please try again later or contact support if the problem persists.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Events Grid */}
          {data && data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {data.length} Event{data.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.1,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 120,
                    }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {data && data.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center py-20"
            >
              <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Events Available</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">Check back later for upcoming events and activities.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
