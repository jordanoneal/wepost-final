import axios from 'axios';
import { IUser } from '../../../common';

export async function Login(username: string, password: string): Promise<IUser | undefined> {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { username, password }, { withCredentials: true });
        return response.data as IUser;
    } catch (err: any) {
        return undefined;
    }
}

export async function Logout(): Promise<void> {
    try {
        await axios.post('http://localhost:4000/auth/logout', { withCredentials: true });
    } catch (err: any) {
        console.error(err);
    }
}