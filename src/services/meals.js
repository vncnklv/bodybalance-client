import { del, get } from "./requester"

export const getDiary = async () => {
    return get('/diary');
}

export const deleteFood = (diaryId, foodId, meal) => {
    return del(`/diary/${diaryId}/${meal}/${foodId}`);
}