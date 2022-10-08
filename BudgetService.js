const dayjs = require('dayjs');

class BudgetService {
  query(start, end) {
    if (dayjs(end).isAfter(start)) {
      const days = dayjs(end).diff(start, 'days') + 1;
      if (dayjs(end).diff(start, 'month') == 0) {
        // 非跨月
        const selectedBudget = this.getBudgetInMonth(+start.format('M'));
        const daysInMonth = selectedBudget.getYearMonth().daysInMonth();
        return selectedBudget.getAmount() / daysInMonth * days;
      } else {
        const startMonthOfBuget = this.getStartMonthOfBuget(start);
        const endMonthOfBuget = this.getEndMonthOfBuget(end);
        const middleMonthOfBuget = this.getMiddleMonthOfBuget(start, end);
        return startMonthOfBuget + middleMonthOfBuget + endMonthOfBuget;
      }
    } else {
      // Invaild data
      return 0;
    }
  }

  getBudgetInMonth(month) {
    const budgets = this.getBudgets();
    const selectedBudget = budgets.find((b) => {
      return +b.getYearMonth().format('M') === +month;
    });
    return selectedBudget;
  }

  getStartMonthOfBuget(start) {
    const daysInMonth = start.daysInMonth();
    const lastDayInMonth = start.endOf('month');
    const days = lastDayInMonth.diff(start, 'days') + 1;
    const selectedBudget = this.getBudgetInMonth(+start.format('M'));
    return selectedBudget.getAmount() / daysInMonth * days;
  }

  getMiddleMonthOfBuget(start, end) {
    let counter = 0;

    for (let i = +start.format('M') + 1; i < +end.format('M'); i++) {
      counter = counter + this.getBudgetInMonth(i).getAmount();
    }

    return counter;
  }

  getEndMonthOfBuget(end) {
    const daysInMonth = end.daysInMonth();
    const days = end.format('D');
    const selectedBudget = this.getBudgetInMonth(+end.format('M'));
    return selectedBudget.getAmount() / daysInMonth * days;
  }

  getBudgets() {
    return [];
  }
}

module.exports = BudgetService;