import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('CPF Inválido!').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
});