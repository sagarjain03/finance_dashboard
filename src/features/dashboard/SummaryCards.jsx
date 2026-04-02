import { useAppContext } from "../../context/AppContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

function SummaryCards() {
  const { transactions } = useAppContext();

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Balance */}
      <motion.div variants={cardVariants} whileHover={{ y: -4, scale: 1.01 }} className="card-premium p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Wallet size={120} />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[var(--text-muted)] text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <Wallet size={16} /> Total Balance
            </h2>
          </div>
          <p className="text-4xl font-bold tracking-tighter text-[var(--text-primary)]">
            {formatCurrency(totalBalance)}
          </p>
        </div>
      </motion.div>

      {/* Income */}
      <motion.div variants={cardVariants} whileHover={{ y: -4, scale: 1.01 }} className="card-premium p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[var(--text-muted)] text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <TrendingUp size={16} /> Income
            </h2>
          </div>
          <p className="text-4xl font-bold tracking-tighter text-emerald-400">
            {formatCurrency(totalIncome)}
          </p>
        </div>
      </motion.div>

      {/* Expense */}
      <motion.div variants={cardVariants} whileHover={{ y: -4, scale: 1.01 }} className="card-premium p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingDown size={120} />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[var(--text-muted)] text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <TrendingDown size={16} /> Expenses
            </h2>
          </div>
          <p className="text-4xl font-bold tracking-tighter text-rose-400">
            {formatCurrency(totalExpense)}
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}

export default SummaryCards;