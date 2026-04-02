export function applyFilters(transactions, search, filterType, sortBy) {
  let data = [...transactions];

  if (search) {
    data = data.filter((tx) =>
      tx.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filterType !== "all") {
    data = data.filter((tx) => tx.type === filterType);
  }

  if (sortBy === "amount") {
    data.sort((a, b) => b.amount - a.amount);
  } else {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
}