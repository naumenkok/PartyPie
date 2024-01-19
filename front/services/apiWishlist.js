import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';
// const BASE_URL = 'http://172.20.10.9:3000';

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


export const deleteWishById = async (wishId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/wishlistRoute/wishlist/delete/${wishId}`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data deleteWishById:', response.data);
        }
    } catch (error) {
        console.error('Error in deleteWishById:', error);
    }
};



export const addWish = async (eventId, name, link) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/wishlistRoute/wishlist/add`,
            {
                eventId: eventId,
                name: name,
                link: link,
            });
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data addWish:', response.data);
        }
    } catch (error) {
        console.error('Error in addWish:', error);
    }
};