import { ButtonHTMLAttributes } from "react";

interface SideBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  isEdditMode: boolean;
}
export function SidebarButton({
  icon,
  label,
  collapsed,
  onClick,
  isEdditMode,
}: SideBarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded hover:bg-accent ${
        isEdditMode ? "bg-accent" : "bg-none"
      } transition-colors cursor-pointer `}>
      {icon}

      {!collapsed && (
        <span className='text-sm font-medium text-white'>{label}</span>
      )}
    </button>
  );
}
