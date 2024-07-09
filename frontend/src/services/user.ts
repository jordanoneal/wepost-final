import axios from "axios";
import { ICreateUser, IUser } from "../../../common";

export async function CreateUser(params: ICreateUser): Promise<IUser | undefined> {
    try {
        const response = await axios.post('http://localhost:4000/users', params, { withCredentials: true });
        return response.data as IUser;
    } catch (err: any) {
        return undefined;
    }
}