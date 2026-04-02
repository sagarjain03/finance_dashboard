import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { CATEGORIES } from "../../constants/categories";
import { cn } from "../../utils/cn";
import { PlusCircle } from "lucide-react";

function TransactionForm() {
  const { addTransaction } = useAppContext();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;
    addTransaction({ amount: Number(amount), category, type, date });
    setAmount("");
    setDate("");
  };

  const inputClass = "w-full bg-[var(--bg-input)] border border-[var(--border-light)] text-[var(--text-primary)] outline-none hover:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] px-3 py-2 rounded-lg transition-all";
  const labelClass = "block text-xs font-semibold mb-1 text-[var(--text-muted)] uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="card-premium p-5 rounded-2xl mb-6 flex flex-wrap gap-4 items-end">
      
      <div className="flex-1 min-w-[120px]">
        <label className={labelClass}>Amount</label>
        <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} placeholder="0.00" />
      </div>
      
      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={cn(inputClass, "[color-scheme:dark]")} />
      </div>

      <button type="submit" className="w-full sm:w-auto bg-white hover:bg-gray-200 text-black font-bold px-6 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 h-10">
        <PlusCircle size={18} /> Add
      </button>

    </form>
  );
}

export default TransactionForm;
