import { AuthSchema } from "../types";

const initialState: AuthSchema = {
    isLoading: false,
    username: '',
    password: '',
    isLogin: true
};

export default initialState;