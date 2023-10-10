import axios from "axios";

const loginUrl = '/usuario/login';
export const useLoginService = () => {
    const login = async (cpf, senha) => {
        try{
            const response = await axios.post(
                'api-arboretto-production-59fe.up.railway.app'
                + loginUrl, {
                cpf,
                senha,
            });
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
        
    };
    return {login};
};