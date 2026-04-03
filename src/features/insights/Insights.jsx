import { useAppContext } from "../../context/AppContext";
import {
  generateInsights,
  getMonthlyComparison,
  getCategoryTrends,
  getSmartInsight,
} from "./insightsUtils";
import { formatCurrency } from "../../utils/formatCurrency";
import { motion } from "framer-motion";
import {
  Lightbulb,
  TrendingDown,
  TrendingUp,
  Target,
  AlertCircle,
  Minus,
  LayoutGrid,
} from "lucide-react";

// ─── Animation presets ────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Small reusable stat card ─────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className="card-premium p-8 rounded-2xl flex items-start gap-4 transition-transform group"
    >
      <div
        className={`p-3 rounded-xl border transition-colors ${
          accent
            ? `${accent.bg} ${accent.border} ${accent.text}`
            : "bg-[var(--hover-bg)] border-[var(--border-light)] text-[var(--text-primary)] group-hover:bg-[var(--border-strong)]"
        }`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-1">
          {label}
        </h2>
        <p className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Trend badge ──────────────────────────────────────────────
function TrendBadge({ trend, percentChange }) {
  if (trend === "no-prev-data") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] bg-[var(--hover-bg)] border border-[var(--border-light)] px-2.5 py-1 rounded-full">
        <Minus size={11} /> No prior data
      </span>
    );
  }
  if (trend === "same") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] bg-[var(--hover-bg)] border border-[var(--border-light)] px-2.5 py-1 rounded-full">
        <Minus size={11} /> Unchanged
      </span>
    );
  }
  const isUp = trend === "up";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
        isUp
          ? "text-rose-400 bg-rose-500/10 border-rose-500/25"
          : "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
      }`}
    >
      {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {Math.abs(percentChange).toFixed(1)}%{" "}
      {isUp ? "more than last month" : "less than last month"}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────
function Insights() {
  const { transactions } = useAppContext();

  const insights = generateInsights(transactions);
  const monthly = getMonthlyComparison(transactions);
  const categoryTrends = getCategoryTrends(transactions);
  const smartInsight = getSmartInsight(transactions);

  // Empty state
  if (!insights) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-4xl"
      >
        <h1 className="text-xl font-bold tracking-tight text-metallic mb-6 ml-2">
          Analytics Insights
        </h1>
        <div className="card-premium p-10 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[var(--hover-bg)] rounded-full flex items-center justify-center mb-4 border border-[var(--border-light)]">
            <AlertCircle size={32} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[var(--text-muted)] text-sm">
            No data available to generate insights.
            <br />
            Add some transactions to get started.
          </p>
        </div>
      </motion.div>
    );
  }

  // Max category value — used for progress bar widths
  const maxCategoryValue = categoryTrends[0]?.value || 1;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1
        variants={itemVariants}
        className="text-xl font-bold tracking-tight text-metallic mb-6 ml-2"
      >
        Analytics Insights
      </motion.h1>

      {/* ── Row 1: existing stat cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={<Target size={24} />}
          label="Highest Spender"
          value={insights.highestSpendingCategory}
        />
        <StatCard
          icon={<TrendingDown size={24} />}
          label="Total Outflow"
          value={formatCurrency(insights.totalExpenses)}
        />
      </div>

      {/* ── Row 2: Monthly Comparison ── */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3 ml-1">
          Monthly Comparison
        </h2>
        <div className="card-premium p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Current month */}
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1">
              {monthly.currentMonth}
            </p>
            <p className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {formatCurrency(monthly.currentTotal)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Current month</p>
          </div>

          {/* Trend badge — centre column */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-[var(--border-light)] sm:hidden" />
              <TrendBadge
                trend={monthly.trend}
                percentChange={monthly.percentChange}
              />
            </div>
          </div>

          {/* Previous month */}
          <div className="text-center sm:text-right">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1">
              {monthly.previousMonth}
            </p>
            <p className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {formatCurrency(monthly.previousTotal)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Previous month</p>
          </div>
        </div>
      </motion.div>

      {/* ── Row 3: Category Breakdown ── */}
      {categoryTrends.length > 0 && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3 ml-1 flex items-center gap-2">
            <LayoutGrid size={12} /> Category Breakdown
          </h2>
          <div className="card-premium p-6 rounded-2xl space-y-4">
            {categoryTrends.map(({ category, value }, i) => {
              const pct = (value / maxCategoryValue) * 100;
              const isTop = i === 0;
              return (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span
                      className={`text-sm font-semibold ${
                        isTop
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {category}
                      {isTop && (
                        <span className="ml-2 text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                          Top
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {formatCurrency(value)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--hover-bg)] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        isTop
                          ? "bg-gradient-to-r from-amber-400 to-orange-400"
                          : "bg-[var(--border-strong)]"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.06 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── Row 4: Smart Insight (AI Observation) ── */}
      <motion.div
        variants={itemVariants}
        className="card-premium p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-l-2xl" />
        <div className="pl-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-blue-400" />
            <h2 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">
              Smart Insight
            </h2>
          </div>
          <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed tracking-tight">
            "{smartInsight}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Insights;
