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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const instagram_private_api_1 = require("instagram-private-api");
const request_promise_1 = require("request-promise");
const cron_1 = require("cron");
const express_1 = __importDefault(require("express"));
dotenv.config();
class InstagramBot {
    constructor() {
        this.ig = new instagram_private_api_1.IgApiClient();
        this.ig.state.generateDevice(process.env.IG_USERNAME || "");
    }
    async login() {
        try {
            await this.ig.account.login(process.env.IG_USERNAME || "", process.env.IG_PASSWORD || "");
            console.log("Login bem-sucedido!");
        }
        catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }
    async postToInsta() {
        try {
            await this.login();
            const imageBuffer = await (0, request_promise_1.get)({
                url: "https://i.imgur.com/BZBHsauh.jpg",
                encoding: null,
            });
            await this.ig.publish.photo({
                file: imageBuffer,
                caption: "Really nice photo from the internet!", // nice caption (optional)
            });
            console.log("Postagem no Instagram bem-sucedida!");
        }
        catch (error) {
            console.error("Erro ao postar no Instagram:", error);
            throw error; // Re-throw the error to be caught by the caller
        }
    }
}
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const instagramBot = new InstagramBot();
const cronInsta = new cron_1.CronJob("30 * * * * *", async () => {
    try {
        await instagramBot.postToInsta();
    }
    catch (error) {
        console.error("Erro ao postar no Instagram:", error);
    }
});
cronInsta.start();
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
