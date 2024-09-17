import { NewProduct } from "../types/products.interface";

class ProductsService {
    constructor() {}

    async getProductById(id: string) {
        const res = await fetch(`http://localhost:6505/products/${id}`);
        const { data } = await res.json();
        return data;
    }

    async addNewProduct(productData: NewProduct) {
        const formFata = new FormData();
        formFata.append('name' ,productData.name);
        formFata.append('description' ,productData.description);
        formFata.append('price' ,productData.price);
        formFata.append('image' ,productData.image);

        const res = await fetch('http://localhost:6505/products', {
            method: "POST",
            body: formFata
        });
        const data = await res.json();
        return data;
    }

    async editExistingProduct(productData: { id: string, name: string, description: string, price: string }) {
        const formFata = new FormData();
        formFata.append('id' ,productData.id);
        formFata.append('name' ,productData.name);
        formFata.append('description' ,productData.description);
        formFata.append('price' ,productData.price);

        const res = await fetch('http://localhost:6505/products', {
            method: "PUT",
            body: formFata
        });
        const data = await res.json();
        return data;
    }

    async deleteProduct(id: string) {
        const res = await fetch('http://localhost:6505/products/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })

        const { msg } = await res.json();

        return msg;
    }
}

export default new ProductsService();