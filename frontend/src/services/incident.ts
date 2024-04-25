'use server'

import axios from "axios"
import { IIncident } from "../../../common"

export const RetrieveIncidents = async (): Promise<IIncident[] | undefined> => {
    const response = await axios.get('http://localhost:4000/incidents', { withCredentials: true })
    if (response.status === 200) return response.data

    return undefined;
}