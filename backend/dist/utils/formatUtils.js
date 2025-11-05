"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateAndTime = formatDateAndTime;
function formatCurrency(value) {
    if (!value || isNaN(Number(value)))
        return '₦-';
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(Number(value));
}
function formatDate(value) {
    if (!value)
        return '-';
    const date = new Date(value);
    return date.toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
function formatDateAndTime(value) {
    if (!value)
        return "-";
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
