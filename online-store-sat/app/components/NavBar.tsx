import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <nav className="sticky flex items-center justify-between top-0 w-full px-10 py-5 border-b z-50 border-gray-200 bg-gray-200 shadow shadow-slate-200 rounded">
            <Link
                href={"/"}
                className="logo-container font-serif font-extrabold text-2xl mr-20"
            >
                <p className='after:relative after:block after:content-[""] after:h-0.5 after:w-full after:bg-black after:origin-left after:transition-transform after:duration-300 after:ease-out after:scale-x-0 hover:after:scale-x-100'>SAOS</p>
            </Link>
            <div className="button-container">
                <Link href={"/"} className="px-3 py-3 mx-2 font-bold transition-colors duration-200 hover:text-violet-700">
                    HOMEPAGE
                </Link>
                <Link href={"/products"} className="px-3 py-3 mx-2 font-bold transition-colors duration-200 hover:text-violet-700">
                    PRODUCTS
                </Link>
            </div>
            <div className="user-actions-container">
                <Link href="/products/create" className="flex justify-center items-center transition-colors duration-200 hover:text-violet-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8 mx-1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div>ADD PRODUCT</div>
                </Link>
            </div>
        </nav>
    );
}
