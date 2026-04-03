// ─────────────────────────────────────────────────────────────
// insightsUtils.js — All insight computation logic lives here
// ─────────────────────────────────────────────────────────────

/** Returns "YYYY-MM" for a date string (ISO or locale-parseable). */
function getYearMonth(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * Original insight summary (kept for backwards compat).
 * @param {Array} transactions
 * @returns {{ highestSpendingCategory, totalExpenses, insightMessage } | null}
 */
export function generateInsights(transactions) {
  if (!transactions || transactions.length === 0) return null;

  let totalExpenses = 0;
  const categoryExpenses = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      totalExpenses += tx.amount;
      categoryExpenses[tx.category] =
        (categoryExpenses[tx.category] || 0) + tx.amount;
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

// ─────────────────────────────────────────────────────────────
// Milestone 13 — New analytics functions
// ─────────────────────────────────────────────────────────────

/**
 * Monthly Comparison
 * Compares total expense of the current calendar month vs. the previous one.
 *
 *  Returns:
 *  {
 *    currentMonth: string,         // "April 2026"
 *    currentTotal: number,
 *    previousMonth: string,        // "March 2026"
 *    previousTotal: number,
 *    percentChange: number | null, // null when previous is 0 (avoid div-by-zero)
 *    trend: "up" | "down" | "same" | "no-prev-data"
 *  }
 */
export function getMonthlyComparison(transactions) {
  const now = new Date();
  const currentYM = getYearMonth(now.toISOString());

  // Previous month (handle January → December wrap)
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousYM = getYearMonth(prevDate.toISOString());

  const monthLabel = (ym) => {
    const [y, m] = ym.split("-");
    return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  let currentTotal = 0;
  let previousTotal = 0;

  (transactions || []).forEach((tx) => {
    if (tx.type !== "expense") return;
    const ym = getYearMonth(tx.date);
    if (ym === currentYM) currentTotal += tx.amount;
    else if (ym === previousYM) previousTotal += tx.amount;
  });

  let percentChange = null;
  let trend = "no-prev-data";

  if (previousTotal > 0) {
    percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    if (Math.abs(percentChange) < 0.01) trend = "same";
    else trend = percentChange > 0 ? "up" : "down";
  }

  return {
    currentMonth: monthLabel(currentYM),
    currentTotal,
    previousMonth: monthLabel(previousYM),
    previousTotal,
    percentChange,
    trend,
  };
}

/**
 * Category Trends
 * Aggregates all-time expense totals by category, sorted highest → lowest.
 *
 * Returns:  Array<{ category: string, value: number }>
 */
export function getCategoryTrends(transactions) {
  const map = {};

  (transactions || []).forEach((tx) => {
    if (tx.type !== "expense") return;
    map[tx.category] = (map[tx.category] || 0) + tx.amount;
  });

  return Object.entries(map)
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Smart Insight
 * Finds the highest-spending category and returns a human-readable insight.
 *
 * Returns: string
 */
export function getSmartInsight(transactions) {
  const trends = getCategoryTrends(transactions);

  if (trends.length === 0) {
    return "No expense data yet. Start adding transactions to unlock insights.";
  }

  const top = trends[0];
  const tips = {
    Food: "Try meal-prepping or cooking at home to cut costs.",
    Shopping: "Consider a 24-hour rule before making non-essential purchases.",
    Transport: "Carpooling or public transit can significantly reduce this.",
    Entertainment: "Set a monthly entertainment cap to stay on budget.",
    Bills: "Review subscriptions and cancel any you no longer use.",
  };

  const tip = tips[top.category] || "Consider setting a tighter budget for this category.";
  return `You are spending most on ${top.category}. ${tip}`;
}
