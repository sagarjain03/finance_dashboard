import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateUtils";
import { useAppContext } from "../../context/AppContext";
import { rolePermissions } from "../roles/roleConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

// Transactions are already filtered/sorted by the parent (Transactions.jsx).
// This component is purely presentational — it renders whatever it receives.
function TransactionTable({ transactions, editingTx, setEditingTx }) {
  const { role, deleteTransaction } = useAppContext();
  const permissions = rolePermissions[role];

  const hasActions = permissions?.canEdit || permissions?.canDelete;

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-[var(--text-muted)] bg-[var(--glass-bg)] border border-[var(--border-strong)] rounded-2xl backdrop-blur-md">
        <p className="text-lg font-medium text-[var(--text-primary)]">No matching transactions</p>
        <p className="text-sm opacity-70">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="card-premium rounded-2xl overflow-x-auto overflow-hidden">
      <table className="w-full text-left whitespace-nowrap">
        {/* Header */}
        <thead className="bg-[var(--hover-bg)] border-b border-[var(--border-light)] uppercase tracking-widest text-xs font-semibold text-[var(--text-muted)]">
          <tr>
            <th className="px-6 py-5">Date</th>
            <th className="px-6 py-5">Amount</th>
            <th className="px-6 py-5">Category</th>
            <th className="px-6 py-5">Type</th>
            {hasActions && <th className="px-6 py-5 text-right">Actions</th>}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <AnimatePresence>
            {transactions.map((tx, index) => {
              const isBeingEdited = editingTx?.id === tx.id;
              return (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  layout
                  className={`border-b border-[var(--border-light)] hover:bg-[var(--hover-bg)] transition-colors group ${
                    isBeingEdited ? "bg-amber-500/5 border-l-2 border-l-amber-400" : ""
                  }`}
                >
                  <td className="px-6 py-5 text-[var(--text-primary)] font-medium">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                        tx.type === "income"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-[var(--hover-bg)] text-[var(--text-primary)] border border-[var(--border-strong)]"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[var(--text-muted)]">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--text-muted)] transition-colors"></span>
                      <span className="group-hover:text-[var(--text-primary)] transition-colors">{tx.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[var(--text-muted)] capitalize">{tx.type}</td>

                  {hasActions && (
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit button — admin only */}
                        {permissions?.canEdit && (
                          <button
                            onClick={() =>
                              setEditingTx(isBeingEdited ? null : tx)
                            }
                            className={`p-2 rounded-lg transition-colors focus:outline-none ${
                              isBeingEdited
                                ? "text-amber-400 bg-amber-500/15 hover:bg-amber-500/25"
                                : "text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10"
                            }`}
                            title={isBeingEdited ? "Cancel Edit" : "Edit Transaction"}
                          >
                            <Pencil size={16} />
                          </button>
                        )}

                        {/* Delete button — admin only */}
                        {permissions?.canDelete && (
                          <button
                            onClick={() => {
                              if (isBeingEdited) setEditingTx(null);
                              deleteTransaction(tx.id);
                            }}
                            className="p-2 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors focus:outline-none"
                            title="Delete Transaction"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;