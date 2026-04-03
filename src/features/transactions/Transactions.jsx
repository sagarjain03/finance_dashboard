import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { rolePermissions } from "../roles/roleConfig";
import { ROLES } from "../../constants/roles";
import { applyFilters } from "./filters";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import { Search, Filter, ArrowUpDown, RotateCcw, CalendarRange, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

// ── CSV export helper ─────────────────────────────────────────
function exportToCSV(data) {
  if (!data.length) return;

  const headers = ["Date", "Amount", "Category", "Type"];
  const rows = data.map((tx) => [tx.date, tx.amount, tx.category, tx.type]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = "transactions.csv";
  link.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────

function Transactions() {
  const { transactions, role, resetData } = useAppContext();
  const permissions = rolePermissions[role];

  // ── Filter / sort state ───────────────────────────────────
  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy,     setSortBy]     = useState("date");

  // ── Milestone 14: Date range ──────────────────────────────
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]   = useState("");

  // ── Milestone 12: Editing state ──────────────────────────
  const [editingTx, setEditingTx] = useState(null);

  // Compute filtered data here so both table AND export share the same slice
  const filteredTransactions = applyFilters(
    transactions,
    search,
    filterType,
    sortBy,
    startDate,
    endDate
  );

  const hasActiveFilter = startDate || endDate;

  const inputStyle =
    "bg-[var(--bg-input)] border border-[var(--border-light)] text-[var(--text-primary)] outline-none hover:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] rounded-xl transition-all shadow-sm";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between ml-2">
        <h1 className="text-xl font-bold tracking-tight text-metallic">
          Transactions
        </h1>

        {role === ROLES.ADMIN && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (window.confirm("Reset all transactions to default mock data?")) {
                resetData();
                setEditingTx(null);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/70 transition-all"
          >
            <RotateCcw size={14} />
            Reset Data
          </motion.button>
        )}
      </div>

      {/* ── Add / Edit Form ── */}
      {permissions?.canAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <TransactionForm editingTx={editingTx} setEditingTx={setEditingTx} />
        </motion.div>
      )}

      {/* ── Controls panel ── */}
      <div className="card-premium p-4 rounded-2xl space-y-3">

        {/* Row 1: Search + Type filter + Sort */}
        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by category..."
              className={cn("w-full pl-9 pr-4 py-2.5 text-sm", inputStyle)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type filter */}
          <div className="relative">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <select
              className={cn("w-full md:w-auto pl-9 pr-8 py-2.5 text-sm appearance-none", inputStyle)}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <select
              className={cn("w-full md:w-auto pl-9 pr-8 py-2.5 text-sm appearance-none", inputStyle)}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        {/* Row 2: Date range + Export */}
        <div className="flex flex-col sm:flex-row gap-3 items-center border-t border-[var(--border-light)] pt-3">

          {/* Date range label */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest shrink-0">
            <CalendarRange size={13} />
            Date Range
          </div>

          {/* Start date */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={cn("flex-1 px-3 py-2.5 text-sm [color-scheme:dark]", inputStyle)}
            title="Start date"
          />

          <span className="text-[var(--text-muted)] text-xs font-medium shrink-0">to</span>

          {/* End date */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={cn("flex-1 px-3 py-2.5 text-sm [color-scheme:dark]", inputStyle)}
            title="End date"
          />

          {/* Clear dates — only show when a date is set */}
          {hasActiveFilter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => { setStartDate(""); setEndDate(""); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-light)] hover:border-[var(--border-strong)] px-3 py-2.5 rounded-xl transition-all shrink-0"
            >
              Clear
            </motion.button>
          )}

          {/* Spacer */}
          <div className="flex-1 hidden sm:block" />

          {/* CSV Export */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => exportToCSV(filteredTransactions)}
            disabled={filteredTransactions.length === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all shrink-0",
              filteredTransactions.length === 0
                ? "opacity-40 cursor-not-allowed border-[var(--border-light)] text-[var(--text-muted)]"
                : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/70"
            )}
            title={
              filteredTransactions.length === 0
                ? "No data to export"
                : `Export ${filteredTransactions.length} row(s) as CSV`
            }
          >
            <Download size={14} />
            Export CSV
            {filteredTransactions.length > 0 && (
              <span className="text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded-full tabular-nums">
                {filteredTransactions.length}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* ── Table — receives pre-filtered data ── */}
      <div className="mt-4">
        <TransactionTable
          transactions={filteredTransactions}
          editingTx={editingTx}
          setEditingTx={setEditingTx}
        />
      </div>
    </motion.div>
  );
}

export default Transactions;