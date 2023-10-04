import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    cpf: Yup.string().email('CPF Inválido!').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório')
});