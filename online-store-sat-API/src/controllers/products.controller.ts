import { bucket, db } from "../app";

class ProductsController {
    constructor() {}

    async getAllProducts() {
        const snapshot = await db.collection('products').get()
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return products;
    }

    async getProductById(id: string) {
        const docRef = db.collection('products').doc(id);
        const productDoc = await docRef.get();

        if(!productDoc.exists) {
            return {msg: "The Product that you are trying to update doesn't exists", data: {}};
        }

        const productData = productDoc.data();

        return { msg: "success", data: productData }
    }

    async addNewProduct(productData: any) {
        const docRef = await db.collection('products').add(productData);
    }

    async editProduct(id: string, updatedProductData: { name: string, description: string, price: number }) {
        const docRef = await db.collection('products').doc(id);
        const productDoc = await docRef.get();

        if(!productDoc.exists) {
            return "The Product that you are trying to update doesn't exists";
        }

        await docRef.update(updatedProductData);
        return "Product updated succesfully!";
    }

    async deleteProduct(id: string) {
        const docRef = await db.collection('products').doc(id);
        const productDoc = await docRef.get();
        
        if (!productDoc.exists) {
            return "The Product that you are trying to delete doesn't exists";
        }

        const productData = productDoc.data();

        if(!productData) {
            return "The document is empty!";
        }

        if(productData.image) {
            const imageName = productData.image.split('/').pop();

            if (imageName) {
                const file = bucket.file(imageName);
                await file.delete();
            }
        }

        await docRef.delete();
        return "Product deleted successfully!";
    }
}

export default new ProductsController();
