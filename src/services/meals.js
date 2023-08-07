import { del, get, patch, post } from "./requester"

export const getDiary = async (date) => {
    return get(`/diary${date ? `?date=${encodeURIComponent(date)}` : ''}`);
}

export const deleteFood = (diaryId, foodId, meal) => {
    return del(`/diary/${diaryId}/${meal}/${foodId}`);
}

export const getFoods = async (page, search) => {
    return get(`/food?page=${page}&search=${search}`);
}

export const addFoodToDiary = async (diaryId, meal, quantity, foodId) => {
    return post(`/diary/${diaryId}`, { meal, quantity, foodId });
}

export const updateFoodInDiary = async (diaryId, currentMeal, entryId, updatedData) => {
    return patch(`/diary/${diaryId}/${currentMeal}/${entryId}`, updatedData);
}

export const addFood = async (data) => {
    return post('/food', data);
}

export const updateFood = async (id, data) => {
    return patch(`/food/${id}`, data);
}

export const deleteFoodItem = async (id) => {
    return del(`/food/${id}`);
}
