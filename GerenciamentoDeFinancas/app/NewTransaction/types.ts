import * as yup from "yup";

export interface TransactionFields {
	title: string;
	amount: number;
	type: string;
	category: string;
	isInstallment: boolean;
	installmentCount?: number;
}

export const transactionValidationSchema = yup.object().shape({
	title: yup.string().required("Título é obrigatório").trim(),
	amount: yup
		.number()
		.required("Valor é obrigatório")
		.typeError("Valor deve ser um número"),
	type: yup.string().required("Tipo é obrigatório"),
	category: yup.string().required("Categoria é obrigatória"),
	isInstallment: yup.boolean().required(),
	installmentCount: yup
		.number()
		.when("isInstallment", (isInstallment, schema) => {
			return isInstallment
				? schema
						.required("Quantidade de parcelas é obrigatória")
						.typeError("Quantidade de parcelas deve ser um número")
				: schema.notRequired();
		})
		.min(1),
});
