import Image from "next/image";
import React from "react";
import { Product } from "../types/products.interface";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default async function ProductsPage() {
    let productsData: Product[] = [];
    try {
        const res = await fetch("http://localhost:6505/products", { cache: 'no-store' });
        const data = await res.json();
        productsData = [...data.data];
    } catch (err) {
        if (err instanceof Error) {
            productsData = [];
            console.log(err.message);
        }
    }

    function handleClick() {
        console.log("ERRR")
    }

    return (
        <main className="main-container w-full flex flex-col gap-2 m-4 justify-center items-center">
            <div className="title h-1/5">
                <h1 className="text-4xl font-extrabold">SAOS</h1>
            </div>
            <div className="products-container grid grid-cols-4 gap-8">
                {productsData.map((product) => (
                    <ProductCard id={product.id} name={product.name} description={product.description} price={product.price} image={product.image} />
                ))}
            </div>
        </main>
    );
}
