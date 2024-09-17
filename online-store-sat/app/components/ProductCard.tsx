"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function ProductCard({
    id,
    name,
    description,
    price,
    image,
}: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}) {

    return (
        <Link
            href={`/products/edit/${id}`}
            id={id}
            key={id}
            className="product-card relative flex flex-col bg-blue-200 text-center"
        >
            <Image
                src={image}
                alt=""
                width={280}
                height={350}
                className=" h-4/5"
            />
            <div className="name font-bold text-2xl">{name}</div>
            <div className="description font-extralight">{description}</div>
            <div className="price text-violet-700 font-extrabold text-xl">
                ${price}
            </div>
        </Link>
    );
}
