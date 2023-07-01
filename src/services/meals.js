import { del, get, post } from "./requester"

export const getDiary = async () => {
    return get('/diary');
}

export const deleteFood = (diaryId, foodId, meal) => {
    return del(`/diary/${diaryId}/${meal}/${foodId}`);
}

export const getFoods = async (page, search) => {
    return get(`/food?page=${page}&search=${search}`);
}

export const addFoodToDiary = async (diaryId, meal, quantity, foodId) => {
    return post(`/diary/${diaryId}`, {meal, quantity, foodId});
}