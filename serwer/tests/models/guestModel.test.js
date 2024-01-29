const Guest = require('../../src/models/guestModel');

jest.mock('mysql', () => ({
    createConnection: jest.fn(),
}));

jest.mock('util', () => ({
    promisify: jest.fn(fn => fn),
}));

const mockQuery = jest.fn();

const mockConnection = {
    query: mockQuery,
};

require('mysql').createConnection.mockReturnValue(mockConnection);

describe('Guest Model Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getEventsByGuestId', () => {
    it('should get events by guest ID', async () => {
        const expectedEvents = [{ event_id: 1, name: 'Event 1' }];
        mockQuery.mockResolvedValue(expectedEvents);

        const guestInstance = new Guest(mockConnection);

        const userId = 123;
        const result = await guestInstance.getEventsByGuestId(userId);

        expect(result).toEqual(expectedEvents);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [userId]);
    });
    });

    describe('getFutureEventsByGuestId', () => {
        it('should get future events by guest ID', async () => {
            const expectedEvents = [{ event_id: 3, name: 'Event 3' }];
            mockQuery.mockResolvedValue(expectedEvents);

            const guestInstance = new Guest(mockConnection);

            const userId = 789;
            const result = await guestInstance.getFutureEventsByGuestId(userId);

            expect(result).toEqual(expectedEvents);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [userId, expect.any(Date)]);
        });
    });

    describe('getEventsByGuestId Error Handling', () => {
        it('should throw an error if the query fails', async () => {
            const errorMessage = 'Query failed';
            mockQuery.mockRejectedValue(new Error(errorMessage));

            const guestInstance = new Guest(mockConnection);

            const userId = 456;
            await expect(guestInstance.getEventsByGuestId(userId)).rejects.toThrow(errorMessage);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [userId]);
        });
    });

    describe('getPastEventsByGuestId Error Handling', () => {
        it('should throw an error if the query fails', async () => {
            const errorMessage = 'Query failed';
            mockQuery.mockRejectedValue(new Error(errorMessage));

            const guestInstance = new Guest(mockConnection);

            const userId = 789;
            await expect(guestInstance.getPastEventsByGuestId(userId)).rejects.toThrow(errorMessage);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [userId, expect.any(Date)]);
        });
    });

    describe('getGuestsByEventId Error Handling', () => {
        it('should throw an error if the query fails', async () => {
            const errorMessage = 'Query failed';
            mockQuery.mockRejectedValue(new Error(errorMessage));

            const guestInstance = new Guest(mockConnection);

            const eventId = 2;
            await expect(guestInstance.getGuestsByEventId(eventId)).rejects.toThrow(errorMessage);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [eventId]);
        });
    });

    describe('getGuestsByEventId with no results', () => {
        it('should return an empty array if no guests found for the event', async () => {
            const expectedGuests = [];
            mockQuery.mockResolvedValue(expectedGuests);

            const guestInstance = new Guest(mockConnection);

            const eventId = 3;
            const result = await guestInstance.getGuestsByEventId(eventId);

            expect(result).toEqual(expectedGuests);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [eventId]);
        });
    });

    describe('getGuestsByEventId with different statuses', () => {
        it('should return guests with different statuses for the event', async () => {
            const expectedGuests = [
                { guest_id: 201, status: 'accepted', username: 'User3' },
                { guest_id: 202, status: 'pending', username: 'User4' },
            ];
            mockQuery.mockResolvedValue(expectedGuests);

            const guestInstance = new Guest(mockConnection);

            const eventId = 4;
            const result = await guestInstance.getGuestsByEventId(eventId);

            expect(result).toEqual(expectedGuests);
            expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [eventId]);
        });
    });

    describe('getPastEventsByGuestId', () => {
    it('should get past events by guest ID', async () => {
        const expectedEvents = [{ event_id: 2, name: 'Event 2' }];
        mockQuery.mockResolvedValue(expectedEvents);

        const guestInstance = new Guest(mockConnection);

        const userId = 456;
        const result = await guestInstance.getPastEventsByGuestId(userId);

        expect(result).toEqual(expectedEvents);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [userId, expect.any(Date)]);
    });
    });

    describe('getGuestsByEventId', () => {
    it('should get guests by event ID', async () => {
        const expectedGuests = [
            { guest_id: 101, status: 'accepted', username: 'User1' },
            { guest_id: 102, status: 'accepted', username: 'User2' },
        ];
        mockQuery.mockResolvedValue(expectedGuests);

        const guestInstance = new Guest(mockConnection);

        const eventId = 1;
        const result = await guestInstance.getGuestsByEventId(eventId);

        expect(result).toEqual(expectedGuests);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [eventId]);
    });
    });
});
