
function formatCurrency(value?: number | string | null): string {
  if (!value || isNaN(Number(value))) return '₦-';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value?: Date | null): string {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
 function formatDateAndTime(value?: Date | string | null): string {
  if (!value) return "-";
  const date = new Date(value);

  return date.toLocaleString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // shows AM/PM
  });
}

export { formatCurrency, formatDate, formatDateAndTime };