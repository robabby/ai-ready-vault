/**
 * Animation utilities for typing effects.
 */

/**
 * Types text character by character over a duration.
 * Returns a cleanup function to clear all pending timeouts.
 *
 * @param text - The text to type
 * @param setter - State setter function to update displayed text
 * @param duration - Total duration in milliseconds
 * @param onComplete - Optional callback when typing completes
 * @returns Cleanup function to cancel animation
 */
export function typeText(
  text: string,
  setter: (value: string) => void,
  duration: number,
  onComplete?: () => void
): () => void {
  const chars = text.split("");
  const charDelay = duration / chars.length;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  chars.forEach((_, index) => {
    const timeout = setTimeout(() => {
      setter(text.slice(0, index + 1));
      if (index === chars.length - 1 && onComplete) {
        onComplete();
      }
    }, charDelay * index);
    timeouts.push(timeout);
  });

  // Return cleanup function
  return () => {
    timeouts.forEach(clearTimeout);
  };
}
