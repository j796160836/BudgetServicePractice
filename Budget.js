const dayjs = require('dayjs');

class Budget {
  YearMonth = "";
  Amount = 0;

  constructor(yearMonth, amount) {
    this.YearMonth = yearMonth;
    this.Amount = amount;
  }

  getYearMonth() {
    return this.YearMonth;
  }

  getDayBudget() {
    return this.Amount / dayjs(this.getYearMonth(), 'YYYYMM').daysInMonth();
  }

  getAmount() {
    return this.Amount;
  }
}

module.exports = Budget;