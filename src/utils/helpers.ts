export function formatCurrency(value: number): string {
    if (value >= 1000000) {
        return ` ${value} JT`;
    } else if (value >= 100000) {
        return `${(value / 1000).toFixed(0)} K`;
    } else {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    }
}

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{3,})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
};