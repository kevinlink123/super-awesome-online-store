'use client';
import productsService from "@/app/services/products.service";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';

export default function AddNewProductPage() {
    const router = useRouter();

    const [erroMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File>();

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.length) {
            setErrorMsg("FILE NOT ENTERED");
            return;
        }

        const fileFromInput = e.target.files[0];
        setImage(fileFromInput);
        setErrorMsg("");
    }

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!name) {
            setErrorMsg("Name cannot be empty!");
            return;
        }

        if(!description) {
            setErrorMsg("Description cannot be empty!");
            return;
        }

        if(!price) {
            setErrorMsg("Price cannot be empty!");
            return;
        }

        if(!image) {
            setErrorMsg("File input cannot be empty!");
            return;
        }

        try {
            setLoading(true);
            const resData = await productsService.addNewProduct({
                name,
                description,
                price,
                image
            });

            setSuccessMsg(resData.msg);
            router.push('/products');

        } catch(err) {
            if(err instanceof Error) {
                console.log(err);
                setLoading(false);
            }
        }
    }

    return (
        <main className="min-h-full flex flex-col items-center">
            <div className="form-container w-1/2 my-6 border-2 rounded-xl p-5">
                <div className="title w-full my-4 text-center text-2xl font-extrabold underline underline-offset-8">Add New Product</div>
                <div className="error-message w-full text-center text-xl text-red-500">{erroMsg}</div>
                <form onSubmit={handleUpload} className="flex flex-col justify-center items-center">
                    <div className='name-input-container flex flex-col w-full relative my-4 border-b-2 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className="border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent peer text-slate-700"
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            htmlFor="name"
                            className={
                                "-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 " +
                                (name ? "-translate-y-4 scale-75" : "")
                            }
                        >
                            Name
                        </label>
                    </div>
                    <div className='description-input-container flex flex-col w-full relative my-4 border-b-2 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className="border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent peer text-slate-700"
                            type="text"
                            name="description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label
                            htmlFor="description"
                            className={
                                "-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 " +
                                (description ? "-translate-y-4 scale-75" : "")
                            }
                        >
                            Description
                        </label>
                    </div>
                    <div className='price-input-container flex flex-col w-full relative my-4 border-b-2 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className="border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent peer text-slate-700"
                            type="number"
                            name="price"
                            autoComplete="off"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label
                            htmlFor="price"
                            className={
                                "-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 " +
                                (price ? "-translate-y-4 scale-75" : "")
                            }
                        >
                            Price
                        </label>
                    </div>
                    <div className="image-input-container my-4">
                        <input
                            className=""
                            type="file" 
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <label htmlFor=""></label>
                    </div>
                    <button disabled={loading} type="submit" className="bg-violet-700 px-6 py-2 rounded-lg text-white font-bold disabled:cursor-not-allowed disabled:bg-violet-950 hover:cursor-pointer">
                        UPLOAD
                    </button>
                    <div className=" text-green-600 my-4">
                        {successMsg == 'success' ? (<div>PRODUCT SUCCESFULLY UPLOADED</div>) : (<div></div>)}
                    </div>
                </form>
            </div>
        </main>
    );
}
