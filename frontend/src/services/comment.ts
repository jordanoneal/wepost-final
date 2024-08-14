'use server'
import axios from "axios"
import { IComment, ICreateComment } from "@common.interfaces"

export async function CreateComment(params: ICreateComment): Promise<IComment | undefined> {
    try {
        const response = await axios.post('http://localhost:4000/comments', params, { withCredentials: true });
        if (response.status === 201) return response.data as IComment;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}