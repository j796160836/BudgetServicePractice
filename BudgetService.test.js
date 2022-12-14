import BudgetService from './BudgetService';
import Budget from './Budget';

const dayjs = require('dayjs');

describe('qrery', () => {
  it('query partial month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310)
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-10-05'));
    expect(result).toBe(50);
  });

  it('query invaild data', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
    ]);
    const result = budgetService.query(new Date('2010-10-31'), new Date('2010-10-01'));
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


  it('query two month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310),
      new Budget('201011', 30),
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-11-30'));
    expect(result).toBe(310 + 30);
  });



  it('query two month check head', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310),
      new Budget('201011', 30),
    ]);
    const result = budgetService.query(new Date('2010-10-30'), new Date('2010-11-30'));
    expect(result).toBe(20 + 30);
  });

  it('query two month check tail', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310),
      new Budget('201011', 30),
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-11-02'));
    expect(result).toBe(310 + 2);
  });


  it('query three month', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310),
      new Budget('201011', 30),
      new Budget('201012', 3100)
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-12-31'));
    expect(result).toBe(310 + 30 + 3100);
  });

  it('query three month with not sequence data', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201010', 310),
      new Budget('201012', 3100)
    ]);
    const result = budgetService.query(new Date('2010-10-01'), new Date('2010-12-31'));
    expect(result).toBe(310 + 3100);
  });

  it('query Dec to next year', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201012', 3100),
      new Budget('201101', 31000),

    ]);
    const result = budgetService.query(new Date('2010-12-01'), new Date('2011-01-31'));
    expect(result).toBe(3100 + 31000);
  });

  it('query Dec to next year check head', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201012', 3100),
      new Budget('201101', 31000),

    ]);
    const result = budgetService.query(new Date('2010-12-30'), new Date('2011-01-31'));
    expect(result).toBe(200 + 31000);
  });


  it('query Dec to next year check tail', () => {
    const budgetService = new BudgetService();
    budgetService.getBudgets = jest.fn().mockReturnValue([
      new Budget('201012', 3100),
      new Budget('201101', 31000),

    ]);
    const result = budgetService.query(new Date('2010-12-01'), new Date('2011-01-06'));
    expect(result).toBe(3100 + 6000);
  });
});