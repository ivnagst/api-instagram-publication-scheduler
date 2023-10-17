import { IgApiClient } from "instagram-private-api";

export class InstagramApi {
  private ig: IgApiClient;

  constructor() {
    this.ig = new IgApiClient();
    this.ig.state.generateDevice(process.env.IG_USERNAME || "");
  }

  async login(): Promise<void> {
    // Implementação do método de login
  }

  async publishToInstagram(imageBuffer: Buffer): Promise<void> {
    // Implementação do método de publicação
  }
}
