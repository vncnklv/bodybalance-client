import { get, post } from "./requester";

export const loginUser = async (userData) => {
    return post('/signin', userData);
};

export const registerUser = async (userData) => {
    return post('/signup', userData);
};

export const logoutUser = async () => {
    return get('/logout');
};

export const getUser = async () => {
    return get('/user');
};

export const getUserGoals = async () => {
    return get('/user/goals');
}

export const setGoal = async (data) => {
    return post('/setUserGoal', data);
}