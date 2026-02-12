import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    children: string;
    className?: string;
    textGradient?: boolean;
    reveal?: boolean;
    staggerDelay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
    children,
    className = '',
    textGradient = false,
    reveal = true,
    staggerDelay = 0.05,
    as: Component = 'h2',
}) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textClass = textGradient ? 'text-gradient' : '';
    const combinedClassName = `${className} ${textClass}`.trim();

    // Split text into spans for letter animation
    const splitText = () => {
        return children.split('').map((char, index) => (
            <span
                key={index}
                className="inline-block opacity-0"
                style={{
                    display: char === ' ' ? 'inline-block' : undefined,
                    width: char === ' ' ? '0.3em' : undefined
                }}
            >
                {char}
            </span>
        ));
    };

    useEffect(() => {
        const element = titleRef.current;
        if (!element) return;

        const chars = element.querySelectorAll('span');

        if (reveal) {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(chars, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: staggerDelay,
                        ease: 'power4.out',
                    });
                },
                once: true,
            });
        } else {
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: staggerDelay,
                ease: 'power4.out',
                delay: 0.2,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [children, staggerDelay, reveal]);

    return (
        <Component ref={titleRef} className={combinedClassName}>
            {splitText()}
        </Component>
    );
};

export default AnimatedTitle;
