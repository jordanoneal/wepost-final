import axios from "axios";
import { ICreateUser, IUser } from "../../../common";

export async function CreateUser(params: ICreateUser): Promise<IUser | undefined> {
    try {
        const response = await axios.post('http://localhost:4000/users', params, { withCredentials: true });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data.user as IUser;
        }
    } catch (err: any) {
        console.error('Registration failed:', err);
        return undefined;
    }
};