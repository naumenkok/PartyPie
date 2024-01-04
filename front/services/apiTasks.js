import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';
// const BASE_URL = 'http://172.20.10.9:3000';

export const getAllTasks = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/taskRoute/event/${eventId}/tasks`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getAllTasks:', response.data);
        }
    } catch (error) {
        console.error('Error in getAllTasks:', error);
    }
};

export const toggleStatusById = async (taskId) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/taskRoute/tasks/toggleStatus/${taskId}`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data toggleStatus:', response.data);
        }
    } catch (error) {
        console.error('Error in toggleStatus:', error);
    }
};

export const updateName = async (taskId, name) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/taskRoute/tasks/updateName`,
            {
                taskId: taskId,
                name: name,
            });
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data updateName:', response.data);
        }
    } catch (error) {
        console.error('Error in updateName:', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/taskRoute/tasks/delete/${taskId}`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data deleteTask:', response.data);
        }
    } catch (error) {
        console.error('Error in deleteTask:', error);
    }
};

export const addTask = async (eventId, name, priority) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/taskRoute/tasks/add`,
            {
                eventId: eventId,
                name: name,
                priority: priority,
            });
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data addTask:', response.data);
        }
    } catch (error) {
        console.error('Error in addTask:', error);
    }
};