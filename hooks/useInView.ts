import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Observe an element and report when it first enters the viewport.
 *
 * One-shot: once the element has been seen, `isInView` stays `true` even after
 * it scrolls away — so lazy-loaded media (Lottie, video) doesn't unmount when
 * the user scrolls past. The observer options are captured once on mount, so
 * callers passing an inline `{ threshold: 0.1 }` object don't churn the effect.
 */
export function useInView(
    options: IntersectionObserverInit = {}
): [RefObject<HTMLDivElement>, boolean] {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const optionsRef = useRef(options);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Fallback for environments without IntersectionObserver.
        if (typeof IntersectionObserver === 'undefined') {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect(); // one-shot
            }
        }, optionsRef.current);

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
}
