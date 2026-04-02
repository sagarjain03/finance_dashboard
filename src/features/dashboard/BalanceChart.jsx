import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

function BalanceChart() {
  const { transactions, theme } = useAppContext();

  const data = transactions.reduce((acc, tx) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const newBalance = lastBalance + (tx.type === "income" ? tx.amount : -tx.amount);
    acc.push({
      date: tx.date,
      balance: newBalance,
    });
    return acc;
  }, []);

  const isDark = theme === "dark";
  const textColor  = isDark ? "#a1a1aa" : "#64748b";
  const gridColor  = isDark ? "#1a1a1a" : "#e2e8f0";
  const tooltipBg  = isDark ? "#111111" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const tooltipText = isDark ? "#ffffff" : "#0f172a";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="card-premium p-6 rounded-2xl flex flex-col h-full"
    >
      <h2 className="mb-8 font-semibold text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: textColor }}>
        Balance Trend
      </h2>

      <div className="w-full flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: tooltipBg, borderRadius: "12px", border: `1px solid ${tooltipBorder}`, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
              itemStyle={{ color: tooltipText, fontWeight: "bold" }}
              labelStyle={{ color: textColor }}
            />
            <Line type="monotone" dataKey="balance" stroke="url(#colorUv)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: isDark ? "#ffffff" : "#0f172a", stroke: isDark ? "#000000" : "#ffffff", strokeWidth: 2 }} animationDuration={1500} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4b6cb7" />
                <stop offset="100%" stopColor="#182848" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default BalanceChart;