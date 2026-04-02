import { useAppContext } from "../../context/AppContext";
import { generateInsights } from "./insightsUtils";
import { formatCurrency } from "../../utils/formatCurrency";
import { motion } from "framer-motion";
import { Lightbulb, TrendingDown, Target, AlertCircle } from "lucide-react";

function Insights() {
  const { transactions } = useAppContext();
  const insights = generateInsights(transactions);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!insights) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-4xl">
        <h1 className="text-xl font-bold tracking-tight text-metallic mb-6 ml-2">Analytics Insights</h1>
        <div className="card-premium p-10 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[var(--hover-bg)] rounded-full flex items-center justify-center mb-4 border border-[var(--border-light)]">
            <AlertCircle size={32} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[var(--text-muted)] text-sm">No data available to generate insights.<br/>Add some transactions to get started.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-xl font-bold tracking-tight text-metallic mb-6 ml-2">
        Analytics Insights
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Highest Spending */}
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="card-premium p-8 rounded-2xl flex items-start gap-4 transition-transform group">
          <div className="p-3 bg-[var(--hover-bg)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] group-hover:bg-[var(--border-strong)] transition-colors">
             <Target size={24} />
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-1">Highest Spender</h2>
            <p className="text-3xl font-extrabold text-[var(--text-primary)] capitalize tracking-tight">{insights.highestSpendingCategory}</p>
          </div>
        </motion.div>
        
        {/* Total Expenses */}
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="card-premium p-8 rounded-2xl flex items-start gap-4 transition-transform group">
          <div className="p-3 bg-[var(--hover-bg)] border border-[var(--border-light)] rounded-xl text-[var(--text-primary)] group-hover:bg-[var(--border-strong)] transition-colors">
             <TrendingDown size={24} />
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-1">Total Outflow</h2>
            <p className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{formatCurrency(insights.totalExpenses)}</p>
          </div>
        </motion.div>
      </div>

      {/* Observation Card */}
      <motion.div variants={itemVariants} className="card-premium p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-l-2xl"></div>
        <div className="pl-6">
          <h2 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3">AI Observation</h2>
          <p className="text-2xl md:text-3xl font-medium text-[var(--text-primary)] leading-relaxed tracking-tight">
            "{insights.insightMessage}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Insights;
