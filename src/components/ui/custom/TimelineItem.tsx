
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  location,
  startDate,
  endDate,
  current = false,
  description,
  isFirst = false,
  isLast = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  useEffect(() => {
    const element = itemRef.current;
    const dot = dotRef.current;
    const line = lineRef.current;
    
    if (!element || !dot || !line) return;
    
    // Set initial state
    gsap.set(element, { x: -20, opacity: 0 });
    gsap.set(dot, { scale: 0 });
    
    if (line) {
      gsap.set(line, { height: 0 });
    }
    
    // Create scroll animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        // Animate the item
        gsap.to(element, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
        
        // Animate the dot
        gsap.to(dot, {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
        
        // Animate the line (if not the last item)
        if (line && !isLast) {
          gsap.to(line, {
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            delay: 0.2
          });
        }
      },
      once: true
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [isLast]);
  
  return (
    <div ref={itemRef} className="relative ml-6 mb-10">
      {/* Timeline dot */}
      <div 
        ref={dotRef} 
        className={`absolute -left-[13px] top-2 w-5 h-5 rounded-full border-2 
        ${current ? 'border-accent bg-accent/20 pulse' : 'border-primary bg-background'}`}
      ></div>
      
      {/* Timeline line */}
      {!isLast && (
        <div 
          ref={lineRef} 
          className="absolute -left-[11px] top-7 w-0.5 h-full bg-gradient-to-b from-primary/80 to-primary/20"
        ></div>
      )}
      
      {/* Content card */}
      <div className="bg-card rounded-xl p-6 card-hover border border-gray-800">
        <div className="flex flex-col mb-3">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <div className="text-lg font-medium mt-1">{company}</div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>
              {formatDate(startDate)} - {current ? 'Present' : endDate ? formatDate(endDate) : ''}
            </span>
          </div>
          
          {location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>{location}</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-gray-300">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
