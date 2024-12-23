// Update the handleMouseEnter in MenuItem component
const handleMouseEnter = useCallback(() => {
  setIsHovered(true);
  if (item.id) {
    analyticsService.trackHover(item);
    onHover?.(item.id);
  }
}, [item, onHover]);

// Add to props interface
interface MenuItemProps {
  // ... existing props
  onHover?: (itemId: string) => void;
}