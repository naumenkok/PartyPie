const express = require('express');
const router = express.Router();
const BudgetController = require('../controllers/budgetController');

router.get('/event/:eventId/budget_categories', BudgetController.getBudgetCategoriesByEventId);
router.get('/budget/:budgetId/budget_subcategories', BudgetController.getBudgetSubcategoriesByBudgetId);

module.exports = router;
