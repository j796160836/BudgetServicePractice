const dayjs = require('dayjs');

class Budget {
  YearMonth = "";
  Amount = 0;

  constructor(yearMonth, amount) {
    this.YearMonth = yearMonth;
    this.Amount = amount;
  }

  getYearMonth() {
    return dayjs(this.YearMonth, 'YYYYMM');
  }

  getAmount() {
    return this.Amount;
  }
}

module.exports = Budget;