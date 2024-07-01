import * as yup from "yup";

export interface FormFields {
	title: string;
	total: string;
}

export const formValidationSchema = yup.object().shape({
	title: yup
		.string()
		.required("O título não pode ser vazio")
		.max(50, "O título deve possuir no máximo 50 caracteres"),
	total: yup.string().required("O total não pode ser vazio"),
});

export interface PutObjectiveData {
	title: string;
	total: number;
}
