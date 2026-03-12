import { useEffect } from 'react';
import useTypewriter from '../hooks/useTypewriter';
import Caret from './Caret';

/**
 * Renders real character-by-character typewriter text.
 */
const TypewriterText = ({
    text,
    speed = 60,
    className = '',
    onComplete,
    showCaret = true,
}) => {
    const { displayText, isComplete } = useTypewriter(text, speed);

    useEffect(() => {
        if (isComplete && onComplete) {
            onComplete();
        }
    }, [isComplete, onComplete]);

    return (
        <span className={className} aria-label={text} role="text">
            <span aria-hidden="true">
                {displayText}
                {showCaret && <Caret />}
            </span>
        </span>
    );
};

export default TypewriterText;
