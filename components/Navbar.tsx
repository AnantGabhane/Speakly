'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import { Show, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {cn} from "@/lib/utils";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
]

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 border-b border-[#ded6c7] bg-(--bg-primary)">
            <div className="mx-auto flex h-[74px] w-full max-w-[1200px] items-center justify-between px-5 xl:px-0">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="Speakly" width={42} height={26} />
                    <span className="logo-text">Speakly</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>
                                {label}
                            </Link>
                        )
                    })}

                    <div className="flex gap-3 items-center">
                        <Show when="signed-out">
                            <SignInButton mode="modal">
                                <button type="button" className="h-9 rounded-[8px] bg-[#172033] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#263149] cursor-pointer">
                                    Sign In
                                </button>
                            </SignInButton>
                        </Show>
                        <Show when="signed-in">
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </Show>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
