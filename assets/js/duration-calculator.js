function calculateDuration(startDateStr) {
  const startParts = startDateStr.split(' ');
  const startMonth = new Date(Date.parse(startParts[0] + " 1, " + startParts[1]));
  const now = new Date();
  
  const monthsDiff = (now.getFullYear() - startMonth.getFullYear()) * 12 + 
                    (now.getMonth() - startMonth.getMonth());
  
  if (monthsDiff < 12) {
    return `(${monthsDiff} month${monthsDiff === 1 ? '' : 's'})`;
  }
  
  const years = monthsDiff / 12;
  const roundedYears = Math.floor(years * 2) / 2; // Round to nearest .5
  return `(${roundedYears} year${roundedYears === 1 ? '' : 's'})`;
}

// Update durations on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-start-date]').forEach(element => {
    const startDate = element.dataset.startDate;
    if (startDate) {
      element.textContent = calculateDuration(startDate);
    }
  });
}); 