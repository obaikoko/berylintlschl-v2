'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, ExternalLink } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Spinner from '@/components/shared/spinner';

const EventDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: events, isLoading, isError } = useGetEventsQuery();
  
  const eventId = params.id as string;
  const event = events?.find(e => e.id === eventId);
  
  const isUpcoming = event ? new Date(event.date) > new Date() : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Spinner />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading event details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Event Not Found</h3>
            <p className="text-red-600 dark:text-red-300 text-center mb-6">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Button 
              onClick={() => router.push('/events')}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="container mx-auto px-4 lg:px-8 pt-6"
      >
        <Button
          onClick={() => router.push('/events')}
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="relative h-[400px] md:h-[500px] overflow-hidden mt-6"
      >
        {event.imageUrl ? (
          <Image
            width={1920}
            height={1080}
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center">
            <Calendar className="w-32 h-32 text-white/80" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <Badge 
            variant={isUpcoming ? "default" : "secondary"}
            className={`px-4 py-2 text-sm font-medium ${
              isUpcoming 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg'
            }`}
          >
            {isUpcoming ? 'Upcoming Event' : 'Past Event'}
          </Badge>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="relative -mt-20 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-12"
          >
            {/* Event Header */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              >
                {event.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center text-lg text-gray-700 dark:text-gray-300"
              >
                <Calendar className="w-5 h-5 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                <span className="font-medium">
                  {formatDateTime(event.date)}
                </span>
              </motion.div>
            </div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About This Event</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>
            </motion.div>

            {/* Event Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8 border border-blue-100/50 dark:border-blue-800/30"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                <span>Register for Event</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => router.push('/events')}
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                View All Events
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage; 