import { del, get } from "./requester"

export const getDiary = async () => {
    return get('/diary');
}

export const deleteFood = (diaryId, foodId, meal) => {
    return del(`/diary/${diaryId}/${meal}/${foodId}`);
}

export const getFoods = async (page, search) => {
    return get(`/food?page=${page}&search=${search}`);
}