import { get, patch, post } from "./requester";

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

export const changePassword = async (data) => {
    return post('/changePassword', data);
}

export const getUserFoods = async (page, search) => {
    return get(`/user/foods?page=${page}&search=${search}`);
}

export const updateUserGoals = async (data) => {
    return patch('/user/goals', data);
}

export const addUserWeight = async (data) => {
    return post('/user/weight', data);
}

export const getUserWeightIns = async () => {
    return get('/user/weight');
}
