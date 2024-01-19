const Budget = require("../models/budgetModel");

exports.getBudgetCategoriesByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Budget.getBudgetCategoriesByEventId(eventId, (err, budgetCategories) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving budget categories' });
        } else {
            res.status(200).json(budgetCategories);
        }
    });
};

exports.getBudgetSubcategoriesByBudgetId = (req, res) => {
    const budgetId = req.params.budgetId;

    Budget.getBudgetSubcategoriesByBudgetId(budgetId, (err, budgetSubcategories) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving budget subcategories' });
        } else {
            res.status(200).json(budgetSubcategories);
        }
    });
};


