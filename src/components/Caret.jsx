/**
 * Blinking caret component
 * Uses CSS animation - opacity toggle every 600ms
 * Independent from typewriter logic
 */
const Caret = ({ className = '' }) => {
    return (
        <span
            className={`inline-block w-[3px] h-[0.9em] bg-accent-cyan ml-0.5 align-middle animate-blink ${className}`}
            aria-hidden="true"
        />
    );
};

export default Caret;
