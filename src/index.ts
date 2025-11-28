import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandling.middleware";
import authRouter from "./routes/auth.route";
import { limiter } from "./common/utils/rateLimiter";
dotenv.config()

const PORT = process.env.PORT || 8000;

const app = express();


//global middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(limiter);
//routes
app.use('/api/v1', authRouter)



//error handling middleware must be last middleware

app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => {
    res.json("Server is running on port " + PORT)
})



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})


