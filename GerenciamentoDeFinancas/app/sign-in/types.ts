import * as yup from "yup";

export interface FormFields {
	email: string;
	password: string;
}

export const formValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.required("O email não pode ser vazio")
		.email("Digite um email válido")
		.lowercase(),
	password: yup
		.string()
		.trim()
		.required("A senha não pode ser vazia")
		.min(6, "A senha deve conter pelo menos 6 dígitos"),
});
