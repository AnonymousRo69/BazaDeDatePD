"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let passwords = ["23rfegsdgq3asdfgweq2!$@$!asfaf@", "wqf623rsd@#!%1efg!@51dG23t"];
const mytoken = "aiflociimariba";
const numberRule = /^[a-z]{2}\d{2,3}[a-z]{3}$/;
function ReadDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.readFile('./DataBase.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    return reject(err); // If there is an error, reject the promise
                }
                try {
                    const jsonData = data ? JSON.parse(data) : []; // Parse the data
                    resolve(jsonData); // If successful, resolve the promise with parsed data
                }
                catch (parseError) {
                    console.error('Error parsing JSON data:', parseError);
                    reject(parseError); // If parsing fails, reject the promise
                }
            });
        });
    });
}
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
app.get("/database", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send(yield ReadDatabase());
}));
app.post("/database", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    let item = req.body.numar;
    let Database = yield ReadDatabase();
    if (typeof token === 'string') {
        if (token === mytoken) {
            if (typeof item === 'string' && numberRule.test(item)) {
                if (!Database.includes(item)) {
                    Database.push(item);
                    fs.writeFile('./DataBase.json', JSON.stringify(Database, null, 2), (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                            return res.status(500).send("Error saving to database.");
                        }
                    });
                    return res.status(200).send(true);
                }
                return res.status(409).send(false);
            }
            return res.status(422).send(false);
        }
    }
    return res.status(403).send("Acces Denied");
}));
const PORT = 8000;
app.listen(PORT, () => { console.log(`Started BackEnd at port ${PORT}`); });
