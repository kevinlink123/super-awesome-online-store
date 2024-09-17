import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from 'multer';
import productsRouter from './routes/products.routes';

import admin from 'firebase-admin';

const serviceAccountJson = require('../super-awesome-online-store-firebase-adminsdk-o0jfb-ce67fc5b2c.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
    storageBucket: "super-awesome-online-store.appspot.com",
})
const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/products", productsRouter);

export {app, db, bucket};
