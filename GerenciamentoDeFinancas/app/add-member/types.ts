import * as yup from "yup";

export interface FormFields {
	email: string;
}

export const formValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.required("O email não pode ser vazio")
		.email("Digite um email válido")
		.lowercase(),
});
