export interface Objective {
	id: string;
	title: string;
	total: number;
	email: string;
	userId: string;
	familyId: string;
	createdAt: string;
	creator: {
		firstName: string;
		lastName: string;
	}
}
