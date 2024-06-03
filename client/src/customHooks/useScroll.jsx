import { useEffect } from 'react';

const useScroll = (callback) => {
 useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

      // Call the callback function only if the user is at the bottom
      if (isAtBottom) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
 }, [callback]); // Dependency array ensures the effect re-runs if the callback changes
};

export default useScroll;
