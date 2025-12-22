export function formatNumber(number) {
  if (typeof number !== 'number') {
    return number;
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

export function formatDateToString(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function isToday(date) {
  if (!date) return false;
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
}

// Format rate with proper decimals
export function formatRate(rate) {
  if (typeof rate !== 'number') {
    return rate;
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 6
  }).format(rate);
}
