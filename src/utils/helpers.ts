import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
export function formatCurrency(value: number): string {
    if (value >= 1000000) {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            maximumFractionDigits: 5
        }).format(value / 1000000) + ' JT';
    } else if (value >= 100000) {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            maximumFractionDigits: 5
        }).format(value / 1000) + ' K';
    } else if (value >= 10000) {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            maximumFractionDigits: 5
        }).format(value / 1000) + ' K';
    } else if (value >= 1000) {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            maximumFractionDigits: 5
        }).format(value / 1000) + ' K';
    } else {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            maximumFractionDigits: 5
        }).format(value) + ' K';
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
export const formatDate = (date: string, dateFormat: string) => {
    return format(parseISO(date), dateFormat, { locale: id });
}
