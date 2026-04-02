import RoleSwitcher from "../../features/roles/RoleSwitcher";
import { useAppContext } from "../../context/AppContext";
import { Moon, Sun, User, Menu } from "lucide-react";
import { cn } from "../../utils/cn";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="h-14 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-light)] flex items-center px-4 justify-between shadow-sm transition-colors">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-full hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)]"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold tracking-tight text-metallic hidden sm:block">
          Finance
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <div className="h-4 w-px bg-[var(--border-strong)] mx-1"></div>
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)]"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <User size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;