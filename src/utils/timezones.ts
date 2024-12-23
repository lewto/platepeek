// Get timezone options using Intl API
export function getTimezoneOptions(): { value: string; label: string }[] {
  // Get unique timezone names
  const timeZones = Intl.supportedValuesOf('timeZone');
  
  return timeZones.map(zone => {
    try {
      // Format the timezone name for display
      const label = new Intl.DateTimeFormat('en', {
        timeZone: zone,
        timeZoneName: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date());

      // Extract just the timezone name from the formatted string
      const timezoneName = label.split(' ').slice(-2).join(' ');

      return {
        value: zone,
        label: `${zone.replace('_', ' ')} (${timezoneName})`
      };
    } catch (error) {
      return {
        value: zone,
        label: zone.replace('_', ' ')
      };
    }
  }).sort((a, b) => a.label.localeCompare(b.label));
}

// Get local timezone
export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}