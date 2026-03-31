"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Settings,
  PanelLeft,
  SquarePen,
} from "lucide-react";
import { Divider } from "./Divider";
import { useWindow } from "@/hooks/useWindow";
import { SidebarButton } from "../buttons/SideBarButton";

type SideBarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

function SidebarLink({ href, icon, label, collapsed }: SideBarLinkProps) {
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
  const { toggleEdditMode, isEdditMode } = useWindow();

  const handleClick = () => {
    console.log("Button clicked!");
    toggleEdditMode();
  };
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
      <div
        className={`flex  ${
          collapsed ? "justify-center" : "justify-end"
        } justify-center p-2`}>
        <button
          style={{ color: "#fff" }}
          onClick={() => setCollapsed((prev) => !prev)}
          className='p-2 hover:bg-accent rounded'>
          <PanelLeft size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`flex flex-col gap-2 px-2 mt-2  ${
          !collapsed ? " items-start" : "items-center"
        }`}>
        <SidebarLink
          href='/'
          icon={<Home size={18} />}
          label='Home'
          collapsed={collapsed}
        />

        <SidebarLink
          href='/dashboard'
          icon={<LayoutDashboard size={18} />}
          label='Dashboard'
          collapsed={collapsed}
        />
        <Divider />
        <SidebarLink
          href='/settings'
          icon={<Settings size={18} />}
          label='Settings'
          collapsed={collapsed}
        />

        <SidebarButton
          icon={<SquarePen size={18} color='white' />}
          label='Edit Dashbord'
          collapsed={collapsed}
          isEdditMode={isEdditMode}
          onClick={() => {
            handleClick();
            toggleEdditMode();
          }}
        />
      </nav>
    </div>
  );
}
