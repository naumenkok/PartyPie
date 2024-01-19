const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class Budget {
    static getBudgetCategoriesByEventId(eventId, callback) {
        const query = "SELECT * FROM budget_categories WHERE event_id = ?";
        connection.query(query, [eventId], (err, budgetCategories) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, budgetCategories);
            }
        });
    }

    static getBudgetSubcategoriesByBudgetId(budgetId, callback) {
        const query = "SELECT * FROM budget_subcategories WHERE budget_id = ?";
        connection.query(query, [budgetId], (err, budgetSubcategories) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, budgetSubcategories);
            }
        });
    }
}

module.exports = Budget;