import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

function CategoryChart() {
  const { transactions, theme } = useAppContext();

  const categoryData = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      categoryData[tx.category] = (categoryData[tx.category] || 0) + tx.amount;
    }
  });

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const isDark = theme === "dark";
  const tooltipBg = isDark ? "#111111" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const tooltipText = isDark ? "#ffffff" : "#0f172a";
  const legendColor = isDark ? "#a1a1aa" : "#64748b";
  const headingColor = isDark ? "#a1a1aa" : "#64748b";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="card-premium p-6 rounded-2xl flex flex-col h-full"
    >
      <h2 className="mb-8 font-semibold text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: headingColor }}>
        Spending Breakdown
      </h2>

      <div className="w-full flex-1 flex items-center justify-center min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={100} 
              paddingAngle={5}
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: tooltipBg, borderRadius: "12px", border: `1px solid ${tooltipBorder}`, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
              itemStyle={{ fontWeight: "bold", color: tooltipText }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px", color: legendColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default CategoryChart;