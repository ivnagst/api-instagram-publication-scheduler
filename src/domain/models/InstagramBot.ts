import { IgApiClient } from "instagram-private-api";

export class InstagramBot {
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

  async postToInsta(imageBuffer: Buffer): Promise<void> {
    try {
      await this.login();

      await this.ig.publish.photo({
        file: imageBuffer,
        caption: "Really nice photo from the internet!", // nice caption (optional)
      });

      console.log("Postagem no Instagram bem-sucedida!");
    } catch (error) {
      console.error("Erro ao postar no Instagram:", error);
      throw error;
    }
  }
}
