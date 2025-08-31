'use client';

import Image from 'next/image';
import { EventSchema } from '@/schemas/eventSchema';
import { formatDateTime } from '@/lib/utils';
import { Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const EventCard = ({ event }: { event: EventSchema }) => {
  const router = useRouter();
  const isUpcoming = new Date(event.date) > new Date();
  
  const handleViewDetails = () => {
    router.push(`/events/${event.id}`);
  };
  
  return (
    <Card className="group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-white/20 dark:border-slate-700/50">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {event.imageUrl ? (
          <Image
            width={500}
            height={300}
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/80" />
          </div>
        )}
        
        {/* Overlay with status badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={isUpcoming ? "default" : "secondary"}
            className={`px-3 py-1 text-xs font-medium shadow-lg ${
              isUpcoming 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {isUpcoming ? 'Upcoming' : 'Past Event'}
          </Badge>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {event.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {event.description}
        </p>
        
        {/* Event Date */}
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-6">
          <Calendar className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <span className="font-medium">
            {formatDateTime(event.date)}
          </span>
        </div>
        
        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group/btn shadow-lg hover:shadow-xl"
          >
            <span>View Details</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </CardContent>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 transition-colors duration-300 pointer-events-none" />
    </Card>
  );
};

export default EventCard;
