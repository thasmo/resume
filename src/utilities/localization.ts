import { defaultLocale, messages } from '../localization';

export function getCurrentLocale(locale?: string): keyof typeof messages {
	return (locale === 'en' || locale === 'de')
		? (locale as keyof typeof messages)
		: defaultLocale;
}

export function useDate(locale: keyof typeof messages) {
	return function formatDate(value: string): string {
		return new Date(value).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
	};
}

export function useMessages(locale: keyof typeof messages) {
	return function m(key: keyof (typeof messages)[typeof defaultLocale]): string {
		return messages[locale][key] || messages[defaultLocale][key];
	};
}
