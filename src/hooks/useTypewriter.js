import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text, speed = 55) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const indexRef = useRef(0);
    const timerRef = useRef(null);
    const resetRef = useRef(null);

    useEffect(() => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (resetRef.current) {
            window.clearTimeout(resetRef.current);
        }

        resetRef.current = window.setTimeout(() => {
            indexRef.current = 0;
            setDisplayText('');
            setIsComplete(false);

            if (!text) {
                setIsComplete(true);
                return;
            }

            timerRef.current = window.setInterval(() => {
                indexRef.current += 1;
                setDisplayText(text.slice(0, indexRef.current));

                if (indexRef.current >= text.length) {
                    setIsComplete(true);
                    window.clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            }, speed);
        }, 0);

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (resetRef.current) {
                window.clearTimeout(resetRef.current);
                resetRef.current = null;
            }
        };
    }, [text, speed]);

    return { displayText, isComplete };
};

export default useTypewriter;
