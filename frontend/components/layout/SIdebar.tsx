"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, LayoutDashboard, Settings, PanelLeft } from "lucide-react";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

function SidebarItem({ href, icon, label, collapsed }: Props) {
  return (
    <Link
      style={{ color: "#fff" }}
      href={href}
      className='flex items-center gap-3 p-2 rounded hover:bg-accent transition-colors'>
      {icon}

      {!collapsed && (
        <span className='text-sm font-medium text-white'>{label}</span>
      )}
    </Link>
  );
}

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`
        fixed top-[76px] left-0 
        h-[calc(100vh-76px)]
        ${collapsed ? "w-16 " : "w-64"}
        bg-background border-r
        transition-all duration-300
        flex flex-col
        z-40
      `}>
      {/* Toggle button */}
      <div className={`flex  ${collapsed? "justify-start" : "justify-end"} justify-center p-2`}>
        <button
          style={{ color: "#fff" }}
          onClick={() => setCollapsed((prev) => !prev)}
          className='p-2 hover:bg-accent rounded'>
          <PanelLeft size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col gap-2 px-2 mt-2'>
        <SidebarItem
          href='/'
          icon={<Home size={18} />}
          label='Home'
          collapsed={collapsed}
        />

        <SidebarItem
          href='/dashboard'
          icon={<LayoutDashboard size={18} />}
          label='Dashboard'
          collapsed={collapsed}
        />

        <SidebarItem
          href='/settings'
          icon={<Settings size={18} />}
          label='Settings'
          collapsed={collapsed}
        />
      </nav>
    </div>
  );
}
