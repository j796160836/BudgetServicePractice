const dayjs = require('dayjs');

class BudgetService {
  query(start, end) {
    if (dayjs(end).isAfter(start)) {
      const days = dayjs(end).diff(start, 'days') + 1;
      const budgets = this.getBudgets();
      if (dayjs(end).diff(start, 'month') == 0) {
        // 非跨月

        const selectedBudget = budgets.filter((b) => {
          return b.getYearMonth().isSame(start, 'month');
        });
        console.log(selectedBudget);
        if (selectedBudget.length > 0) {
          console.log(selectedBudget);
          console.log(days);
          const daysInMonth = selectedBudget[0].getYearMonth().daysInMonth();
          return selectedBudget[0].getAmount() / daysInMonth * days;
        }
      }
      return 50;
    } else {
      // Invaild data
      return 0;
    }
  }

  getBudgets() {
    return [];
  }
}

module.exports = BudgetService;