export function generateInsights(transactions) {
  if (!transactions || transactions.length === 0) {
    return null;
  }

  let totalExpenses = 0;
  const categoryExpenses = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      totalExpenses += tx.amount;
      categoryExpenses[tx.category] = (categoryExpenses[tx.category] || 0) + tx.amount;
    }
  });

  if (totalExpenses === 0) {
    return {
      highestSpendingCategory: "None",
      totalExpenses: 0,
      insightMessage: "You haven't recorded any expenses yet. Great job saving!",
    };
  }

  let highestCategory = "";
  let highestAmount = 0;

  for (const [category, amount] of Object.entries(categoryExpenses)) {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }

  return {
    highestSpendingCategory: highestCategory,
    totalExpenses,
    insightMessage: `Watch out! You spend most on ${highestCategory}. To maximize savings, consider setting a tighter budget for this category.`,
  };
}
