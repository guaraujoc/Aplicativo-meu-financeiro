import * as yup from "yup";

export interface FormFields {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export const formValidationSchema = yup.object().shape({
	firstName: yup
		.string()
		.required("O nome não pode ser vazio")
		.max(20, "O nome deve conter no máximo 20 dígitos")
		.trim(),
	lastName: yup
		.string()
		.required("O sobrenome não pode ser vazio")
		.max(20, "O sobrenome deve conter no máximo 20 dígitos")
		.trim(),
	email: yup
		.string()
		.required("O email não pode ser vazio")
		.email("Digite um email válido")
		.trim()
		.lowercase(),
	password: yup
		.string()
		.required("A senha não pode ser vazia")
		.min(6, "A senha deve conter pelo menos 6 dígitos")
		.trim(),
	passwordConfirmation: yup
		.string()
		.required("A confirmação da senha não pode ser vazia")
		.oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});
