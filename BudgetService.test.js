import BudgetService from './BudgetService';
import Budget from './Budget';

const dayjs = require('dayjs');

describe('qrery', () => {
  it('query partial month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310)
    ]);
    const result = budgetService.query(dayjs('2010-10-01'), dayjs('2010-10-05'));
    expect(result).toBe(50);
  });

  it('query invaild data', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
    ]);
    const result = budgetService.query(dayjs('2010-10-31'), dayjs('2010-10-01'));
    expect(result).toBe(0);
  });

  it('query full month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310)
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-10-31'));
    expect(result).toBe(310);
  });
});