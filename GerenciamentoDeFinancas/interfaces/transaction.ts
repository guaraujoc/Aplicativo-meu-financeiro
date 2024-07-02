export interface Transaction {
	id: string;
	title: string;
	amount: number;
	category?: string;
	type: string;
	isInstallment: boolean;
	installmentCount?: number;
	userId: string;
}
