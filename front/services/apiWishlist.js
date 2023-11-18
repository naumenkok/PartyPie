import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';

export const getWishesByEventId = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/wishlistRoute/event/${eventId}/wishlist`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getPostsByEventId:', response.data);
        }
    } catch (error) {
        console.error('Error in getPostsByEventIds:', error);
    }
};

export const toggleStatusById = async (wish_id, guestId) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/wishlistRoute/wishlist/toggleStatus`,
            {
                itemId: wish_id,
                guestId: guestId
            }
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data toggleStatusById:', response.data);
        }
    } catch (error) {
        console.error('Error in toggleStatusById:', error);
    }
};
