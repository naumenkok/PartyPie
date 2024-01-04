import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';
// const BASE_URL = 'http://172.20.10.9:3000';

export const authenticateUser = async (username, password) => {
    const response = await axios.post(
        `${BASE_URL}/userRoute/login`,
        {
            username: username,
            password: password,
        });
    if (response.data) {
        return response.data;
    } else {
        console.error('Error in data authenticateUser:', response.data);
    }
};

export const signUpUser = async (name, surname, username, email, password) => {
    const response = await axios.post(
        `${BASE_URL}/userRoute/create`,
        {
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password,
        });
    if (response.data) {
        return response.data;
    } else {
        console.error('Error in data signUpUser:', response.data);
    }
};

export const getUsernameByID = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/userRoute/usernameById/${userId}`);
        if (response.data) {
            return response.data[0].username;
        } else {
            console.error('Error in data getUsernameByID:', response.data);
        }
    } catch (error) {
        console.error('Error in getUsernameByID:', error);
    }
};

export const addGuest = async (user_id, code) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/guestRoute/guest/add`,
            {
                user_id: user_id,
                code: code,
            }
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data addGuest:', response.data);
        }
    } catch (error) {
        console.error('Error in addGuest:', error);
    }
};
