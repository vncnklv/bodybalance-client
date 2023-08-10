import { del, get, patch, post } from "./requester";

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

export const getAllTrainers = async (page, search) => {
    return get('/user/trainers?page=' + page + '&search=' + search);
}

export const becomeTrainer = async (data) => {
    return post('/becomeTrainer', data);
}

export const getTrainerClients = async (page, search) => {
    return get('/user/clients?page=' + page + '&search=' + search);
}

export const hireTrainer = async (data) => {
    return post('/user/trainer', data);
}

export const fireTrainer = async () => {
    return del('/user/trainer');
}

export const updateUserGoalsByTrainer = async (userId, data) => {
    return patch('/user/goals/' + userId, data);
}

export const getAllUsers = async (page, search) => {
    return get('/users?page=' + page + '&search=' + search);
}

export const demoteTrainer = async (userId) => {
    return patch('/user/trainer/' + userId);
}

export const deleteUser = async (userId) => {
    return del('/user/' + userId);
}

