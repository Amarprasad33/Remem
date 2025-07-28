"use client"

import { useRef, useState } from "react";


export default function Sidebar() {
    const [sideMenuToggle, setSideMenuToggle] = useState(true);
    const sideMenuRef = useRef<HTMLDivElement>(null);

    const onClickToggleSideMenu = () => {
        setSideMenuToggle(!sideMenuToggle);
    }
    const closeSideMenu = () => {
        setSideMenuToggle(false);
    }

    return (
        <aside id="sidebar-multi-level-sidebar" className={`fixed lg:sticky left-0 top-0 z-10 h-[100dvh] ${sideMenuToggle ? 'w-full' : 'w-0'} overflow-hidden transition-all duration-300 lg:max-w-[224px] lg:pointer-events-auto ${sideMenuToggle ? 'opacity-100' : 'opacity-0 lg:opacity-100'}  ${sideMenuToggle ? 'pointer-events-auto' : 'pointer-events-none'} ${sideMenuToggle ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
            <div id="sidebar-contents" ref={sideMenuRef} className={`relative h-[100dvh] text-[#fff] max-w-[224px] mr-auto px-2 py-4 transition-transform duration-300 ease-in-out flex flex-col gap-4 overflow-y-auto bg-[#EDEDED] dark:bg-[#0A0A0A] border-r border-[#D4D4D4] dark:border-[#3D3D3D]`}>
            <div className="flex gap-3 text-[#fff] items-center mx-auto w-[94%]">
                <button onClick={closeSideMenu} className="p-2 rounded-lg hover:bg-[var(--btnHover)] dark:hover:bg-[var(--darkBtnHover)] cursor-pointer">
                <svg className="text-[#1D1C1B] dark:text-[#F3F3F3]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 10H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6.5 14H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M15 3L15 13M15 17L15 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M2 11V13C2 16.7712 2 18.6569 3.17157 19.8284C4.34315 21 6.22876 21 10 21H14C17.7712 21 19.6569 21 20.8284 19.8284C22 18.6569 22 16.7712 22 13V11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2.51839 4.82475 2.22937 5.69989 2.10149 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                </button>
                <div className="ml-auto flex gap-1">
                    <div className="p-2 rounded-lg text-neutral-200 hover:bg-[var(--btnHover)] dark:hover:bg-[var(--darkBtnHover)]">
                        {/* <SearchIcon className="text-[var(--iconColor)] dark:text-[var(--darkIconColor)]" /> */}
                        search
                    </div>
                    <div className="p-2 rounded-lg text-neutral-200 hover:bg-[var(--btnHover)] dark:hover:bg-[var(--darkBtnHover)]">
                        {/* <NewChatIcon className="text-[var(--iconColor)] dark:text-[var(--darkIconColor)]" /> */}
                        new +
                    </div>
                </div>
            </div>
            <h3 className="text-sm font-medium text-black dark:text-white mt-20 ms-3">Knowledge base</h3>
            <ul className=" font-medium">
                <li>
                <a target="_blank" className="group flex text-sm items-center py-2 text-[#414141] dark:hover:bg-zinc-900 hover:bg-zinc-300 rounded-lg dark:text-white group cursor-pointer">
                    <span className="ms-3">Home</span>
                    {/* <DropdownWithIcons /> */}
                </a>
                </li>
            </ul>
            {/* <BlurredFooterCard className="mt-auto" /> */}

            </div>
        </aside>
    )
}