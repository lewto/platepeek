import { useEffect } from 'react';

export function useMousePosition() {
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      target.style.setProperty('--mouse-x', `${x}%`);
      target.style.setProperty('--mouse-y', `${y}%`);
    };

    document.querySelectorAll('.theme-interactive').forEach(element => {
      element.addEventListener('mousemove', updateMousePosition);
    });

    return () => {
      document.querySelectorAll('.theme-interactive').forEach(element => {
        element.removeEventListener('mousemove', updateMousePosition);
      });
    };
  }, []);
}