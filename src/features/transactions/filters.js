/**
 * applyFilters — single source of truth for all transaction filtering.
 *
 * @param {Array}  transactions  - raw array (never mutated)
 * @param {string} search        - category search string
 * @param {string} filterType    - "all" | "income" | "expense"
 * @param {string} sortBy        - "date" | "amount"
 * @param {string} startDate     - ISO date string "YYYY-MM-DD" or ""
 * @param {string} endDate       - ISO date string "YYYY-MM-DD" or ""
 * @returns {Array} filtered + sorted copy
 */
export function applyFilters(
  transactions,
  search,
  filterType,
  sortBy,
  startDate = "",
  endDate = ""
) {
  let data = [...transactions];

  // ── Search by category ──────────────────────────────────────
  if (search) {
    data = data.filter((tx) =>
      tx.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // ── Income / Expense filter ─────────────────────────────────
  if (filterType !== "all") {
    data = data.filter((tx) => tx.type === filterType);
  }

  // ── Date range filter ───────────────────────────────────────
  // Parse once; guard against invalid input
  const start = startDate ? new Date(startDate) : null;
  const end   = endDate   ? new Date(endDate)   : null;

  // Clamp end date to end-of-day so "endDate" is inclusive
  if (end) end.setHours(23, 59, 59, 999);

  if (start || end) {
    data = data.filter((tx) => {
      const txDate = new Date(tx.date);
      if (isNaN(txDate)) return true; // keep malformed dates rather than silently drop
      if (start && end && start > end) return true; // invalid range → show all
      if (start && txDate < start) return false;
      if (end   && txDate > end)   return false;
      return true;
    });
  }

  // ── Sort ────────────────────────────────────────────────────
  if (sortBy === "amount") {
    data.sort((a, b) => b.amount - a.amount);
  } else {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
}