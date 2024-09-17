import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import productsController from "../controllers/products.controller";
import multer from "multer";
import { bucket } from "../app";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("FETCHING ALL PRODUCTS");
        const products = await productsController.getAllProducts();
        res.send({ msg: "success", data: products });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ msg: err.message, data: "" });
        }
    }
});

router.get("/:id", 
    [
        body("id").notEmpty().withMessage("The ID cannot be empty"),
    ],
    async (req: Request ,res: Response) => {
        const id = req.params.id;

        try {
            const responseObject = await productsController.getProductById(id);
            res.send(responseObject);
        } catch(err) {
            if (err instanceof Error) {
                res.status(500).send({ msg: err.message, data: "" });
            }
        }
    }
);

router.post(
    "/",
    upload.single("image"),
    [
        body("name").notEmpty().withMessage("The name cannot be empty"),
        body("price").notEmpty().withMessage("The price cannot be empty"),
        body("description").optional().isString(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                    msg: "Some parameters are missing in the body",
                    data: errors.array(),
                });
        }

        if (!req.file) {
            return res
                .status(500)
                .send({ msg: "Image for the product missing!", data: {} });
        }

        const { name, description, price } = req.body;
        try {
            const imageName = `${Date.now()}-${req.file?.originalname}`;
            const file = bucket.file(imageName);

            await file.save(req.file.buffer, {
                contentType: req.file.mimetype,
                public: true,
            });

            const imageURL = `https://storage.googleapis.com/${bucket.name}/${imageName}`;

            await productsController.addNewProduct({
                name,
                description,
                price,
                image: imageURL,
            });

            res.send({ msg: "success", data: {} });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ msg: err.message, data: "" });
            }
        }
    }
);

router.put(
    "/",
    upload.single("image"),
    [
        body("id")
            .notEmpty()
            .withMessage("You must provide a product id to modify"),
        body("name").notEmpty().withMessage("The name cannot be empty"),
        body("price").notEmpty().withMessage("The price cannot be empty"),
        body("description").optional().isString(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                    msg: "Some parameters are missing in the body",
                    data: errors.array(),
                });
        }

        const { id } = req.body;
        const { name, price, description } = req.body;
        try {
            const msg = await productsController.editProduct(id, {
                name,
                price,
                description,
            });
            res.send({ msg, data: {} });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ msg: err.message, data: "" });
            }
        }
    }
);

router.delete(
    "/",
    [body("id").notEmpty().withMessage("You must provide a product id")],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .send({
                        msg: "Some parameters are missing in the body",
                        data: errors.array(),
                    });
            }

            const { id } = req.body;

            const msg = await productsController.deleteProduct(id);
            res.send({ msg, data: {} });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send({ msg: err.message, data: "" });
            }
        }
    }
);

export default router;
