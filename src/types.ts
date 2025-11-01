export interface Contact {
	email: string;
	location: Location;
	name: Name;
	photo: string;
	role: string;
	website: string;
}

export interface Experience {
	company: string;
	positions: Position[];
	tasks?: string[];
	technologies: string[];
	url: string;
	testimonial: boolean;
}

export interface Language {
	level: string;
	name: string;
}

export interface Profile {
	name: string;
	url: string;
}

export interface Project {
	description?: string;
	end?: string;
	name: string;
	start: string;
	technologies: string[];
	url: string;
}

export interface Technology {
	level: number;
	name: string;
	url: string;
}

interface Location {
	city: string;
	country: string;
}

interface Name {
	first: string;
	last: string;
}

interface Position {
	end: string;
	name: string;
	start: string;
}
