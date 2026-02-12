
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
    name: string;
    level: number;
    maxLevel?: number;
    color?: string;
    className?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({
    name,
    level,
    maxLevel = 5,
    color = 'from-primary to-accent',
    className = '',
}) => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = barRef.current;
        if (!element) return;

        // Set initial state - width: 0
        gsap.set(element, { width: 0 });

        // Animate width based on level when scrolled into view
        ScrollTrigger.create({
            trigger: element,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(element, {
                    width: `${(level / maxLevel) * 100}%`,
                    duration: 1,
                    ease: 'power2.out'
                });
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
    }, [level, maxLevel]);

    return (
        <div className={`mb-4 ${className}`}>
            <div className="flex justify-between mb-1">
                <span className="text-sm text-white font-medium">{name}</span>
                <span className="text-xs text-gray-400">{level}/{maxLevel}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
                <div
                    ref={barRef}
                    className={`h-2 rounded-full bg-gradient-to-r ${color}`}
                ></div>
            </div>
        </div>
    );
};

export default SkillBar;
