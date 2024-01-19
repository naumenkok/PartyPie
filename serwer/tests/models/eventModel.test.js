const Event = require('../../src/models/eventModel');
const mysql = require('mysql');

describe('Event class', () => {
    let connection;

    beforeEach(() => {
        connection = {
            query: jest.fn(),
            end: jest.fn(),
        };
        jest.spyOn(mysql, 'createConnection').mockReturnValue(connection);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
//
//     describe('getDaysUntilEvent', () => {
//         it('returns correct number of days until the event', (done) => {
//             const eventId = 1;
//
//             Event.getDaysUntilEvent(eventId)
//                 .then((daysUntilEvent) => {
//                     expect(daysUntilEvent).toBeDefined();
//                     // Sprawdzanie czy daysUntilEvent zawiera oczekiwane dane
//
//                     done();
//                 })
//                 .catch((err) => {
//                     done(err);
//                 });
//         });
//
//         it('handles errors appropriately', (done) => {
//             const eventId = 1;
//
//             jest.spyOn(connection, 'query').mockRejectedValueOnce(new Error('Test error'));
//
//             Event.getDaysUntilEvent(eventId)
//                 .then(() => {
//                     done.fail('The function should handle errors');
//                 })
//                 .catch((err) => {
//                     expect(err).toBeDefined();
//
//                     done();
//                 });
//         });
//     });
//
//     describe('getEventIdByEventCode', () => {
//         it('returns event ID for a given event code', (done) => {
//             const eventCode = 'ABC123';
//
//             Event.getEventIdByEventCode(eventCode, (err, eventId) => {
//                 expect(err).toBeNull();
//                 expect(eventId).toBeDefined();
//
//                 done();
//             });
//         });
//
//         it('handles errors appropriately', (done) => {
//             const eventCode = 'ABC123';
//
//             // Symulacja błędu w zapytaniu SQL
//             jest.spyOn(connection, 'query').mockRejectedValueOnce(new Error('Test error'));
//
//             // Ustawienie limitu czasu na 15 sekund (lub dostosuj według potrzeb)
//             jest.setTimeout(15000);
//
//             // Przechwytywanie błędów na poziomie testu, aby uniknąć przekroczenia czasu
//             try {
//                 Event.getEventIdByEventCode(eventCode, (err, eventId) => {
//                     expect(err).toBeDefined();
//                     expect(eventId).toBeNull();
//
//                     // Przywracamy oryginalną implementację metody query
//                     connection.query.mockRestore();
//
//                     done();
//                 });
//             } catch (error) {
//                 // W przypadku błędu, również zakończ test
//                 done(error);
//             }
//         });
//     });
//
//     // Dodaj testy dla pozostałych funkcji
//
});
