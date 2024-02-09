"use client"

import { ReactNode, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NotificationsBoard } from "@/components/notifications-board";
import { ModeToggle } from "@/components/toggle-mode";

import { useUser } from "@/context/user-context";
import Link from "next/link";
import { Menu, ShoppingCart, LogOut, CircleDollarSign, Home } from "lucide-react";

export default function PageLayout({ children }: { children: ReactNode }) {

    const { user } = useUser()

    const [isMenuOpen, setIsMenuOpen,] = useState<boolean>(false)

    const handleLogout = () => {

        localStorage.removeItem("id")
        localStorage.removeItem("token")

        window.location.reload()
    }

    if (user) {

        const { coins, notifications, userName } = user

        return (

            <div>
                <div
                    className="h-14 bg-zinc-100 dark:bg-zinc-950/95 flex justify-end items-center p-2 pr-4 gap-4 border-b-2 border-violet-500 -z-40"
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="cursor-pointer duration-200 hover:scale-105"
                                size={30}
                            />
                        </SheetTrigger>

                        <SheetContent
                            className="border-l-2 border-violet-500"
                        >
                            <SheetHeader>
                                <SheetTitle
                                    className="capitalize"
                                >
                                    Olá, {userName} <br />
                                    <span
                                        className="flex gap-2 items-center mt-3"
                                    >
                                        {coins}
                                        <CircleDollarSign
                                            color="yellow"
                                            size={18}
                                        />
                                    </span>
                                </SheetTitle>
                            </SheetHeader>

                            <div
                                className="w-full flex flex-col p-2 mt-12 gap-2"
                            >
                                <ModeToggle />

                                <Link
                                    href={"/home"}
                                >

                                    <div
                                        className="w-full h-full flex items-center gap-2 p-4 text-xl rounded-md hover:text-violet-500 group cursor-pointer"
                                    >
                                        <Home
                                            className="cursor-pointer duration-200  group-hover:scale-110"
                                            size={24}
                                        />
                                        Home
                                    </div>
                                </Link>

                                <NotificationsBoard
                                    notifications={notifications}
                                />

                                <Link
                                    href={"/market"}
                                >
                                    <div

                                        className="w-full h-full flex items-center gap-2 p-4 text-xl rounded-md hover:text-violet-500 group cursor-pointer"
                                    >
                                        <ShoppingCart
                                            className="cursor-pointer duration-200  group-hover:scale-110"
                                            size={24}
                                        />
                                        Mercado
                                    </div>
                                </Link>

                                <div
                                    onClick={handleLogout}
                                    className="w-full h-full flex items-center gap-2 p-4 text-xl rounded-md hover:text-violet-500 group cursor-pointer"
                                >
                                    <LogOut
                                        className="cursor-pointer duration-200 group-hover:scale-110"
                                        size={24}
                                    />
                                    Sair
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                {children}
            </div >
        )
    }
}