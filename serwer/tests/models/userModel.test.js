const User = require('../../src/models/userModel');

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

describe('User Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should insert a new user into the database', async () => {
            const mockResult = [{ max_id: 1 }];
            mockQuery.mockResolvedValueOnce(mockResult);

            const user = new User(mockConnection);
            const userId = await user.createUser('John', 'Doe', 'johndoe', 'john@example.com', 'password');

            expect(userId).toBe(2);
            expect(mockQuery).toHaveBeenCalledWith(
                'INSERT INTO Users (user_id, name, surname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                [2, 'John', 'Doe', 'johndoe', 'john@example.com', 'password']
            );
        });

        it('should handle errors during user creation', async () => {
            mockQuery.mockRejectedValueOnce(new Error('Database error'));
            const user = new User(mockConnection);
            await expect(
                user.createUser('John', 'Doe', 'johndoe', 'john@example.com', 'password')
            ).rejects.toThrow('Database error');
        });
    });

    describe('getUserById', () => {
        it('should retrieve a user by ID from the database', async () => {
            const userId = 1;
            const userData = [{ user_id: userId, name: 'John', surname: 'Doe' }];
            mockQuery.mockResolvedValueOnce(userData);
            const user = new User(mockConnection);
            const result = await user.getUserById(userId);
            expect(result).toEqual(userData);
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM Users WHERE user_id = ?', [userId]);
        });

        it('should handle errors during user retrieval by ID', async () => {
            const userId = 1;
            mockQuery.mockRejectedValueOnce(new Error('Database error'));
            const user = new User(mockConnection);
            await expect(user.getUserById(userId)).rejects.toThrow('Database error');
        });
    });

    describe('getAllUsers', () => {
        it('should retrieve all users from the database', async () => {
            const allUsersData = [{ user_id: 1, name: 'John', surname: 'Doe' }, { user_id: 2, name: 'Jane', surname: 'Doe' }];
            mockQuery.mockResolvedValueOnce(allUsersData);
            const user = new User(mockConnection);
            const result = await user.getAllUsers();
            expect(result).toEqual(allUsersData);
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM Users');
        });

        it('should handle errors during retrieval of all users', async () => {
            mockQuery.mockRejectedValueOnce(new Error('Database error'));
            const user = new User(mockConnection);
            await expect(user.getAllUsers()).rejects.toThrow('Database error');
        });
    });

    describe('getUserByLoginAndPassword', () => {
        it('should retrieve a user by login and password from the database', async () => {
            const username = 'johndoe';
            const password = 'password';
            const userData = [{ user_id: 1, username, password }];
            mockQuery.mockResolvedValueOnce(userData);
            const user = new User(mockConnection);
            const result = await user.getUserByLoginAndPassword(username, password);
            expect(result).toEqual(userData[0]);
            expect(mockQuery).toHaveBeenCalledWith('SELECT user_id FROM Users WHERE username = ? AND password = ?', [username, password]);
        });

        it('should handle errors during user retrieval by login and password', async () => {
            const username = 'johndoe';
            const password = 'password';
            mockQuery.mockRejectedValueOnce(new Error('Database error'));
            const user = new User(mockConnection);
            await expect(user.getUserByLoginAndPassword(username, password)).rejects.toThrow('Database error');
        });
    });
});
