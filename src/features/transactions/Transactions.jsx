import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { rolePermissions } from "../roles/roleConfig";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

function Transactions() {
  const { transactions, role } = useAppContext();
  const permissions = rolePermissions[role];

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const inputStyle = "bg-[var(--bg-input)] border border-[var(--border-light)] text-[var(--text-primary)] outline-none hover:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] rounded-xl transition-all shadow-sm";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between ml-2">
        <h1 className="text-xl font-bold tracking-tight text-metallic">
          Transactions
        </h1>
      </div>

      {permissions?.canAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <TransactionForm />
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 p-4 card-premium rounded-2xl">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by category..."
            className={cn("w-full pl-10 pr-4 py-3 text-sm", inputStyle)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <select
            className={cn("w-full md:w-auto pl-10 pr-8 py-3 text-sm appearance-none", inputStyle)}
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
          <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <select
            className={cn("w-full md:w-auto pl-10 pr-8 py-3 text-sm appearance-none", inputStyle)}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <TransactionTable
          transactions={transactions}
          search={search}
          filterType={filterType}
          sortBy={sortBy}
        />
      </div>
    </motion.div>
  );
}

export default Transactions;