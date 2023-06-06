import { get } from "./requester"

export const getDiary = async () => {
    return get('/diary');
}