const dayjs = require('dayjs');

class BudgetService {
  query(start, end) {
    if (!this.isVaildDate(start, end)) {
      return 0;
    }

    const days = dayjs(end).diff(dayjs(start), 'days') + 1;
    if (this.isSameYearMonth(start, end)) {
      // 非跨月
      const selectedBudget = this.getBudgetInYearMonth(dayjs(start).format('YYYYMM'));
      return selectedBudget.getDayBudget() * days;
    } else {
      const startMonthOfBuget = this.getStartMonthOfBuget(start);
      const endMonthOfBuget = this.getEndMonthOfBuget(dayjs(end));
      const middleMonthOfBuget = this.getMiddleMonthOfBuget(dayjs(start), dayjs(end));
      return startMonthOfBuget + middleMonthOfBuget + endMonthOfBuget;
    }
  }

  isVaildDate(start, end) {
    return dayjs(end).isAfter(dayjs(start));
  }

  isSameYearMonth(date1, date2) {
    return dayjs(date1).diff(dayjs(date2), 'month') === 0
      && dayjs(date1).diff(dayjs(date2), 'year') === 0;
  }

  getBudgetInYearMonth(yearMonth) {
    return this.getBudgets().find(budget => {
      return budget.getYearMonth() === yearMonth;
    });
  }

  getStartMonthOfBuget(start) {
    const lastDayInMonth = dayjs(start).endOf('month');
    const days = lastDayInMonth.diff(dayjs(start), 'days') + 1;
    const selectedBudget = this.getBudgetInYearMonth(dayjs(start).format('YYYYMM'));
    return selectedBudget.getDayBudget() * days;
  }

  getMiddleMonthOfBuget(start, end) {
    let sum = 0;

    for (let i = 1; i < dayjs(end).diff(start, 'month'); i++) {
      const selectedBudget = this.getBudgetInYearMonth(dayjs(start).add(i, 'month').format('YYYYMM'));
      sum += selectedBudget !== undefined ? selectedBudget.getAmount() : 0;
    }

    return sum;
  }

  getEndMonthOfBuget(end) {
    const days = dayjs(end).format('D');
    const selectedBudget = this.getBudgetInYearMonth(dayjs(end).format('YYYYMM'));
    return selectedBudget.getDayBudget() * days;
  }

  getBudgets() {
    // Input budgets
    return [];
  }
}

module.exports = BudgetService;