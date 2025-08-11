import dotenv from "dotenv"
import express from "express";
import cors  from  "cors";
import mongoose from "mongoose";
import routes from "./route/Route.js"
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";  

// import  connectDB from "./config/db";
const app = express();
//middleware

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// ✅ These two lines are needed when using ES modules to get __dirname:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ This line makes your /uploads folder publicly accessible:

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose.set("strictQuery", false)
mongoose
    .connect('mongodb+srv://ekavwormiracle:12345678aa@cluster0.0e2bmlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(() => console.log("DB connected"))
    .catch ((err) => console.log("DB connect error", err))

dotenv.config()
// connectDB()

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello server is running ");
})

app.use("/api", routes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})




