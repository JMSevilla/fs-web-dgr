import axios from 'axios'

const baseURL = process.env.REACT_APP_PUBLIC_DB_BASEURL

export class Connect {
    init() {
        const instance = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type" : "application/json"
            }
        })
        return instance
    }
}