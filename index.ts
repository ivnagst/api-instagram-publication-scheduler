import * as dotenv from "dotenv";
import { IgApiClient } from "instagram-private-api";
import { get } from "request-promise";
import { CronJob } from "cron";
import express from "express";

dotenv.config();

class InstagramBot {
  private ig: IgApiClient;

  constructor() {
    this.ig = new IgApiClient();
    this.ig.state.generateDevice(process.env.IG_USERNAME || "");
  }

  async login(): Promise<void> {
    try {
      await this.ig.account.login(process.env.IG_USERNAME || "", process.env.IG_PASSWORD || "");
      console.log("Login bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  async postToInsta(): Promise<void> {
    try {
      await this.login();

      const imageBuffer = await get({
        url: "https://i.imgur.com/BZBHsauh.jpg",
        encoding: null,
      });

      await this.ig.publish.photo({
        file: imageBuffer,
        caption: "Really nice photo from the internet!", // nice caption (optional)
      });

      console.log("Postagem no Instagram bem-sucedida!");
    } catch (error) {
      console.error("Erro ao postar no Instagram:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const instagramBot = new InstagramBot();

const cronInsta = new CronJob("30 * * * * *", async () => {
  try {
    await instagramBot.postToInsta();
  } catch (error) {
    console.error("Erro ao postar no Instagram:", error);
  }
});

cronInsta.start();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
