import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, PieChart } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

function Sidebar({ isSidebarOpen }) {
  const location = useLocation();

  const links = [
    { path: "/app", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/app/transactions", icon: <ArrowLeftRight size={20} />, label: "Transactions" },
    { path: "/app/insights", icon: <PieChart size={20} />, label: "Insights" },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isSidebarOpen ? 240 : 80 }}
      className="bg-[var(--bg-card)] border-r border-[var(--border-light)] h-full flex flex-col p-4 z-40 overflow-hidden shrink-0 transition-colors"
    >
      <div className="h-14 mb-8 flex items-center justify-center">
        {/* Placeholder aligning with Navbar height */}
      </div>

      <div className="space-y-3">
        {links.map((link) => {
          const isActive = location.pathname === link.path || (location.pathname === "/" && link.path === "/app");
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap",
                isActive 
                  ? "bg-[var(--border-strong)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              <div className="shrink-0">{link.icon}</div>
              
              <motion.span 
                animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? "auto" : 0 }}
                className="overflow-hidden block text-sm tracking-wide"
              >
                {link.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Sidebar;