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

// Ustawienie właściwości `query` w obiekcie połączenia
require('mysql').createConnection.mockReturnValue(mockConnection);

describe('User Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should insert a new user into the database', async () => {
            // Arrange
            const mockResult = [{ max_id: 1 }];
            mockQuery.mockResolvedValueOnce(mockResult);

            // Act
            const user = new User(mockConnection);
            const userId = await user.createUser('John', 'Doe', 'johndoe', 'john@example.com', 'password');

            // Assert
            expect(userId).toBe(2); // Assuming the next user ID is 2 (mockResult + 1)
            expect(mockQuery).toHaveBeenCalledWith(
                'INSERT INTO Users (user_id, name, surname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                [2, 'John', 'Doe', 'johndoe', 'john@example.com', 'password']
            );
        });

        it('should handle errors during user creation', async () => {
            // Arrange
            mockQuery.mockRejectedValueOnce(new Error('Database error'));

            // Act & Assert
            const user = new User(mockConnection);
            await expect(
                user.createUser('John', 'Doe', 'johndoe', 'john@example.com', 'password')
            ).rejects.toThrow('Database error');
        });
    });

    describe('getUserById', () => {
        it('should retrieve a user by ID from the database', async () => {
            // Arrange
            const userId = 1;
            const userData = [{ user_id: userId, name: 'John', surname: 'Doe' }];
            mockQuery.mockResolvedValueOnce(userData);

            // Act
            const user = new User(mockConnection);
            const result = await user.getUserById(userId);

            // Assert
            expect(result).toEqual(userData);
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM Users WHERE user_id = ?', [userId]);
        });

        it('should handle errors during user retrieval by ID', async () => {
            // Arrange
            const userId = 1;
            mockQuery.mockRejectedValueOnce(new Error('Database error'));

            // Act & Assert
            const user = new User(mockConnection);
            await expect(user.getUserById(userId)).rejects.toThrow('Database error');
        });
    });

    describe('getAllUsers', () => {
        it('should retrieve all users from the database', async () => {
            // Arrange
            const allUsersData = [{ user_id: 1, name: 'John', surname: 'Doe' }, { user_id: 2, name: 'Jane', surname: 'Doe' }];
            mockQuery.mockResolvedValueOnce(allUsersData);

            // Act
            const user = new User(mockConnection);
            const result = await user.getAllUsers();

            // Assert
            expect(result).toEqual(allUsersData);
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM Users');
        });

        it('should handle errors during retrieval of all users', async () => {
            // Arrange
            mockQuery.mockRejectedValueOnce(new Error('Database error'));

            // Act & Assert
            const user = new User(mockConnection);
            await expect(user.getAllUsers()).rejects.toThrow('Database error');
        });
    });

    describe('getUserByLoginAndPassword', () => {
        it('should retrieve a user by login and password from the database', async () => {
            // Arrange
            const username = 'johndoe';
            const password = 'password';
            const userData = [{ user_id: 1, username, password }];
            mockQuery.mockResolvedValueOnce(userData);

            // Act
            const user = new User(mockConnection);
            const result = await user.getUserByLoginAndPassword(username, password);

            // Assert
            expect(result).toEqual(userData[0]);
            expect(mockQuery).toHaveBeenCalledWith('SELECT user_id FROM Users WHERE username = ? AND password = ?', [username, password]);
        });

        it('should handle errors during user retrieval by login and password', async () => {
            // Arrange
            const username = 'johndoe';
            const password = 'password';
            mockQuery.mockRejectedValueOnce(new Error('Database error'));

            // Act & Assert
            const user = new User(mockConnection);
            await expect(user.getUserByLoginAndPassword(username, password)).rejects.toThrow('Database error');
        });
    });
});
