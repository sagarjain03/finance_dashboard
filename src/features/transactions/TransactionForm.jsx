import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { CATEGORIES } from "../../constants/categories";
import { cn } from "../../utils/cn";
import { PlusCircle, Pencil, X } from "lucide-react";

function TransactionForm({ editingTx, setEditingTx }) {
  const { addTransaction, updateTransaction } = useAppContext();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const isEditing = Boolean(editingTx);

  // Pre-fill form when editingTx changes
  useEffect(() => {
    if (editingTx) {
      setAmount(String(editingTx.amount));
      setCategory(editingTx.category);
      setType(editingTx.type);
      setDate(editingTx.date);
    }
  }, [editingTx]);

  const resetForm = () => {
    setAmount("");
    setCategory(CATEGORIES[0]);
    setType("expense");
    setDate("");
    setEditingTx(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;

    if (isEditing) {
      updateTransaction({ ...editingTx, amount: Number(amount), category, type, date });
    } else {
      addTransaction({ amount: Number(amount), category, type, date });
    }
    resetForm();
  };

  const inputClass =
    "w-full bg-[var(--bg-input)] border border-[var(--border-light)] text-[var(--text-primary)] outline-none hover:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] px-3 py-2 rounded-lg transition-all";
  const labelClass =
    "block text-xs font-semibold mb-1 text-[var(--text-muted)] uppercase tracking-widest";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "card-premium p-5 rounded-2xl mb-6 flex flex-wrap gap-4 items-end transition-all",
        isEditing && "ring-1 ring-amber-500/30 bg-amber-500/5"
      )}
    >
      {/* Edit mode indicator */}
      {isEditing && (
        <div className="w-full flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
          <Pencil size={12} />
          Editing transaction #{editingTx.id}
        </div>
      )}

      <div className="flex-1 min-w-[120px]">
        <label className={labelClass}>Amount</label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
          placeholder="0.00"
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className={labelClass}>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={cn(inputClass, "[color-scheme:dark]")}
        />
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        {/* Submit — dynamically labelled */}
        <button
          type="submit"
          className={cn(
            "flex-1 sm:flex-none flex items-center justify-center gap-2 font-bold px-6 py-2.5 rounded-lg transition-all h-10",
            isEditing
              ? "bg-amber-400 hover:bg-amber-300 text-black"
              : "bg-white hover:bg-gray-200 text-black"
          )}
        >
          {isEditing ? (
            <><Pencil size={16} /> Update</>
          ) : (
            <><PlusCircle size={18} /> Add</>
          )}
        </button>

        {/* Cancel — only shown while editing */}
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all h-10 text-sm"
          >
            <X size={14} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
