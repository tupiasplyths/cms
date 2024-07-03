import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import postgres from 'postgres';
import { checkPassword, hashPassword } from "./hash/hash";

dotenv.config();

const conn = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

async function login(username: string, password: string) {
    let result = await conn `SELECT password FROM users WHERE username = ${username}`;
    let hash = result[0].password;
    return checkPassword(password, hash);
}

async function register(username: string, password: string, email: string) {
    let hash = hashPassword(password);
    try {
        let result = await conn`INSERT INTO users (username, password, email) VALUES (${username}, ${hash}, ${email})`;
        if (result) {
            return "success";
        }
    } catch (e) {
        console.log(e);
    }
    
    return "fail";
}

app.post("/login", (req: Request, res: Response) => {
    let username = "";
    let password = "";
    if (req.body) {
        username = req.body.username;
        password = req.body.password;
    }
    console.log(req.body);
    console.log(username + " " + password);

    login(username, password).then(result => {
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send({ success: true });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send({ success: false });
        }
    })
})

app.post("/register", (req: Request, res: Response) => {
    let username = "";
    let password = "";
    let email = "";
    if (req.body) {
        username = req.body.username;
        password = req.body.password;
        email = req.body.email;
    }

    register(username, password, email).then(result => {
        if (result === "success") {
            res.setHeader('Content-Type', 'application/json');
            res.send({ success: true });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send({ success: false });
        }
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`));