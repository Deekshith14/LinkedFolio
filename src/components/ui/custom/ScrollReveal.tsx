
import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    from?: 'bottom' | 'left' | 'right' | 'top';
    distance?: number;
    stagger?: number;
    trigger?: boolean;
    reset?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    from = 'bottom',
    distance = 50,
    stagger = 0.1,
    trigger = true,
    reset = false,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const hasSetup = useRef(false);

    const getStartPosition = () => {
        switch (from) {
            case 'left':
                return { x: -distance, y: 0, opacity: 0 };
            case 'right':
                return { x: distance, y: 0, opacity: 0 };
            case 'top':
                return { x: 0, y: -distance, opacity: 0 };
            case 'bottom':
            default:
                return { x: 0, y: distance, opacity: 0 };
        }
    };

    useEffect(() => {
        const element = ref.current;
        if (!element || hasSetup.current) return;

        hasSetup.current = true;

        const childElements = Array.from(element.children);
        const startPosition = getStartPosition();

        // Set initial state
        gsap.set(childElements, startPosition);

        if (trigger) {
            // Create the animation with ScrollTrigger
            gsap.to(childElements, {
                x: 0,
                y: 0,
                opacity: 1,
                duration,
                delay,
                stagger,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: reset ? 'play reverse play reverse' : 'play none none none',
                },
            });
        } else {
            // Without ScrollTrigger - animate immediately
            gsap.to(childElements, {
                x: 0,
                y: 0,
                opacity: 1,
                duration,
                delay,
                stagger,
                ease: 'power2.out',
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [delay, duration, from, distance, stagger, trigger, reset]);

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, child => (
                <div className="overflow-hidden">{child}</div>
            ))}
        </div>
    );
};

export default ScrollReveal;
