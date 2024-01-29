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

    describe('getDaysUntilEvent', () => {
        it('returns correct number of days until the event', (done) => {
            const eventId = 1;

            Event.getDaysUntilEvent(eventId)
                .then((daysUntilEvent) => {
                    expect(daysUntilEvent).toBeDefined();

                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('handles errors appropriately', (done) => {
            const eventId = 1;

            jest.spyOn(connection, 'query').mockRejectedValueOnce(new Error('Test error'));

            Event.getDaysUntilEvent(eventId)
                .then(() => {
                    done.fail('The function should handle errors');
                })
                .catch((err) => {
                    expect(err).toBeDefined();

                    done();
                });
        });
    });

    describe('getEventIdByEventCode', () => {
        it('returns event ID for a given event code', (done) => {
            const eventCode = 'ABC123';

            Event.getEventIdByEventCode(eventCode, (err, eventId) => {
                expect(err).toBeNull();
                expect(eventId).toBeDefined();

                done();
            });
        });

        it('handles errors appropriately', (done) => {
            const eventCode = 'ABC123';

            jest.spyOn(connection, 'query').mockRejectedValueOnce(new Error('Test error'));

            jest.setTimeout(1000);

            try {
                Event.getEventIdByEventCode(eventCode, (err, eventId) => {
                    expect(err).toBeDefined();
                    expect(eventId).toBeNull();

                    connection.query.mockRestore();

                    done();
                });
            } catch (error) {
                done(error);
            }
        });
    });
});