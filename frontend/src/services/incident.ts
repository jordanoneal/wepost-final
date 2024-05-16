'use server'

import axios from "axios"
import { ICreateIncident, IIncident } from "../../../common"

export const RetrieveIncidents = async (): Promise<IIncident[] | undefined> => {
    const response = await axios.get('http://localhost:4000/incidents', { withCredentials: true })
    if (response.status === 200) return response.data

    return undefined;
}

export async function CreateIncident(params: ICreateIncident): Promise<IIncident | undefined> {
    try {
        const response = await axios.post('http://localhost:4000/incidents', params, { withCredentials: true });
        if (response.status === 201) return response.data as IIncident;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function RetrieveIncident(id: number): Promise<IIncident | undefined> {
    try {
        const response = await axios.get(`http://localhost:4000/incidents/${id}`, { withCredentials: true });
        if (response.status === 200) return response.data as IIncident;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}