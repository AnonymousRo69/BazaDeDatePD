import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
let app = express();
app.use(express.json());
app.use(cors());
app.use;
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ppfdiyhdnstgfopvocie.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
async function addNumar(number) {
    try {
        const { data, error } = await supabase
            .from('DataBase')
            .insert([
            { Number: number },
        ])
            .select();
        if (error) {
            console.error('Error inserting data:', error);
        }
        else {
            console.log('Data inserted successfully:', data);
        }
    }
    catch (error) {
        console.error('Unexpected error:', error);
    }
}
async function ReadDatabase() {
    try {
        let { data, error } = await supabase
            .from('DataBase')
            .select('Number');
        if (error) {
            console.log(error);
        }
        else {
            if (data != null)
                return data.map(item => item.Number);
            else
                return [];
        }
    }
    catch (error) {
        console.log(error);
    }
}
let db = await ReadDatabase();
console.log(db, db?.includes("ceva"));
let passwords = ["23rfegsdgq3asdfgweq2!$@$!asfaf@", "wqf623rsd@#!%1efg!@51dG23t"];
const mytoken = "aiflociimariba";
const numberRule = /^[a-z]{1,2}\d{2,3}[a-z]{3}$/;
app.get("/", (req, res) => {
    return res.status(200).send();
});
app.post("/auth", (req, res) => {
    let password = req.body.password;
    passwords.forEach((item, index) => {
        if (password === item) {
            return res.status(200).send(mytoken);
        }
    });
    return res.status(403).send(false);
});
app.get("/database", async (req, res) => {
    return res.status(200).send(await ReadDatabase());
});
app.post("/database", async (req, res) => {
    console.log(`Got Post Request with token ${req.body.token}`)
    let token = req.body.token;
    let item = req.body.numar;
    let db = await ReadDatabase();
    if (typeof token === 'string') {
        if (token === mytoken) {
            if (typeof item === 'string' && numberRule.test(item)) {
                if (!db?.includes(item)) {
                    addNumar(item);
                    return res.status(200).send(true);
                }
                return res.status(409).send(false);
            }
            return res.status(422).send(false);
        }
    }
    return res.status(403).send("Acces Denied");
});
const PORT = 8000;
app.listen(PORT, () => { console.log(`Started BackEnd at port ${PORT}`); });
