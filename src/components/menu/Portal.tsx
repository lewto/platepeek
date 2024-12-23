import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    container.style.position = 'fixed';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.appendChild(container);
    
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
}