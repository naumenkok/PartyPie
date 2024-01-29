import axios from 'axios';

// const BASE_URL = 'http://192.168.1.17:3000';

const BASE_URL = 'https://party-pie-server.azurewebsites.net';
export const getMyPastEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/eventRoute/user/${userId}/past-events`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getMyPastEvents:', response.data);
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
            console.error('Error in data getMyPastEvents:', response.data);
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
            console.error('Error in data getMyPastEvents:', response.data);
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
            console.error('Error in data getMyPastEvents:', response.data);
        }
    } catch (error) {
        console.error('Error in getMyPastEvents:', error);
    }
};

export const getEventByEventId = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/eventRoute/event/${eventId}`);
        if (response.data) {
            return response.data[0];
        } else {
            console.error('Error in data getEventByEventId:', response.data);
        }
    } catch (error) {
        console.error('Error in getEventByEventId:', error);
    }
};

export const createNewEvent = async (eventData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/eventRoute/event/addNew`,
            eventData
        );

        if (response.data) {
            return response.data;
        } else {
            console.error('Error in createNewEvent:', response.data);
        }
    } catch (error) {
        console.error('Error in createNewEvent:', error);
    }
};

export const deleteEventByEventId = async (eventId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/eventRoute/event/delete/${eventId}`
        );

        if (response.data) {
            return response.data;
        } else {
            console.error('Error in deleteEventByEventId1:', response.data);
        }
    } catch (error) {
        console.error('Error in deleteEventByEventId2:', error);
    }
};

export const getDaysUntilEvent = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/eventRoute/event/daysUntil/${eventId}`);
        if (response.data) {
            return response.data;
        } else {
            return response.data;
            console.log('Error in data getDaysUntilEvent:', response.data);
        }
    } catch (error) {
        console.error('Error in getDaysUntilEvent:', error);
    }
};

export const updateEventName = async (eventId, newName) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/eventRoute/event/updateName`,
            {
                eventId: eventId,
                newName: newName,
            }
        );

        if (response.data) {
            console.log('Event name updated successfully');
        } else {
            console.error('Error in data updateEventName:', response.data);
        }
    } catch (error) {
        console.error('Error in updateEventName:', error);
    }
};

export const updateEventLink = async (eventId, newLink) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/eventRoute/event/updateLink`,
            {
                eventId: eventId,
                newLink: newLink,
            }
        );

        if (response.data) {
            console.log('Event link updated successfully');
        } else {
            console.error('Error in data updateEventLink:', response.data);
        }
    } catch (error) {
        console.error('Error in updateEventLink:', error);
    }
};


export const updateEventInfo = async (eventId, country, city, street, house, date) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/eventRoute/event/updateInfo`,
            {
                eventId: eventId,
                country: country,
                city: city,
                street: street,
                house: house,
                date: date,
            }
        );

        if (response.data) {
            console.log('Event information updated successfully');
        } else {
            console.error('Error in data updateEventInfo:', response.data);
        }
    } catch (error) {
        console.error('Error in updateEventInfo:', error);
    }
};