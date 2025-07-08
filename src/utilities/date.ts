export const formatDate = (value: string): string => {
	return new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
