import BudgetService from './BudgetService';
import Budget from './Budget';

describe('qrery', () => {
  it('query partial month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('202010', 300)
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-10-05'));
    expect(result).toBe(5);
  });
});