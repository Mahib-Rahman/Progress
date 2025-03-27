import express from "express"
import cors from "cors"
//import products from "./api/products.routes.js"

const app = express()

app.use(cors())
app.use(express.json)