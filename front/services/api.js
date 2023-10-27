import axios from 'axios';

const BASE_URL = 'http://192.168.1.21:3000';

export const authenticateUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/userRoute/login`,
            {
                username: username,
                password: password,
            });
        if (response.data && response.data.user_id) {
            return response.data.user_id;
        } else {
            console.error('Error in data authenticateUser:', error);
        }
    } catch (error) {
        console.error('Error in authenticateUser:', error);
    }
};

export const getMyPastEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/eventRoute/user/${userId}/past-events`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getMyPastEvents:', error);
        }
    } catch (error) {
        console.error('Error in getMyPastEvents:', error);
    }
};

export const getMyFutureEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/eventRoute/user/${userId}/future-events`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getMyPastEvents:', error);
        }
    } catch (error) {
        console.error('Error in getMyPastEvents:', error);
    }
};

export const getPastEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/guestRoute/guest/${userId}/past-events`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getMyPastEvents:', error);
        }
    } catch (error) {
        console.error('Error in getMyPastEvents:', error);
    }
};

export const getFutureEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/guestRoute/guest/${userId}/future-events`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getMyPastEvents:', error);
        }
    } catch (error) {
        console.error('Error in getMyPastEvents:', error);
    }
};
