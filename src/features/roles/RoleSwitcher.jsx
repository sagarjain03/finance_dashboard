import { useAppContext } from "../../context/AppContext";
import { ROLES } from "../../constants/roles";
import { cn } from "../../utils/cn";

function RoleSwitcher() {
  const { role, setRole } = useAppContext();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest hidden sm:block">Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={cn(
          "p-1.5 rounded-lg text-sm outline-none transition-colors appearance-none px-3 font-medium",
          "bg-[var(--glass-bg)]",
          "border border-[var(--border-light)] text-[var(--text-primary)]",
          "hover:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)]"
        )}
      >
        <option value={ROLES.VIEWER} className="bg-[var(--bg-card)] text-[var(--text-primary)]">Viewer</option>
        <option value={ROLES.ADMIN} className="bg-[var(--bg-card)] text-[var(--text-primary)]">Admin</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;