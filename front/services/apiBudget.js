import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';

export const getAllBudgets = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/budgetRoute/event/${eventId}/budget_categories`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getAllBudgets:', response.data);
        }
    } catch (error) {
        console.error('Error in getAllBudgets:', error);
    }
};

export const getAllSubBudgets = async (budgetId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/budgetRoute/budget/${budgetId}/budget_subcategories`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getAllSubBudgets:', response.data);
        }
    } catch (error) {
        console.error('Error in getAllSubBudgets:', error);
    }
};