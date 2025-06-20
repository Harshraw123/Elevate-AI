'use client'

import React from 'react'
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, User2Icon, Wallet } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "WorkSpace",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "AI Tools",
        url: "/dashboard#aiTools",
        icon: Inbox,
        scrollId: "aiTools",
    },
    {
        title: "My History",
        url: "/dashboard#history",
        icon: Calendar,
        scrollId: "history",
    },
    {
        title: "Billing",
        url: "/billing",
        icon: Wallet,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User2Icon,
    },
]

export function AppSidebar() {
    const path = usePathname();
    const isDashboardPage = path === '/dashboard';

    const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        if (isDashboardPage) {
            e.preventDefault();
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <Sidebar className="bg-slate-950 border-r shadow-md">
            <SidebarHeader className="py-6 flex flex-row items-center justify-center space-y-2  mr-14">
                <Image
                    src="/AI.png"
                    alt="Elevate Logo"
                    width={100}
                    height={100}
             
                    className="w-16 h-16 object-contain"
                    priority
                />
                <h2 className="text-lg font-semibold text-blue-400 ">Elevate</h2>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-4 space-y-1">
                            {items.map((item, index) => {
                                let href = item.url;
                                let onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined = undefined;

                                if (item.scrollId && isDashboardPage) {
                                    href = `#${item.scrollId}`;
                                    onClick = (e) => handleSidebarClick(e, item.scrollId!);
                                } else if (item.title === 'AI Tools' && (path === '/billing' || path === '/profile')) {
                                    href = '/dashboard';
                                }

                                const isActive = path === item.url;

                                return (
                                    <Link
                                        key={index}
                                        href={href}
                                        onClick={onClick}
                                        className={`flex items-center gap-3 text-white font-semibold px-4 py-2 rounded-lg text-sm  hover:bg-gray-500 transition-colors ${
                                            isActive ? "bg-gray-800 text-blue-400" : "text-gray-400"
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-center text-xs text-gray-400 py-4">
                © 2025 Elevate Inc.
            </SidebarFooter>
        </Sidebar>
    )
}
