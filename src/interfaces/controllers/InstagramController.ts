import express from "express";
import { InstagramBot } from "../../domain/models/InstagramBot";

class InstagramController {
  private instagramBot: InstagramBot;

  constructor() {
    this.instagramBot = new InstagramBot();
  }

  public handlePostRequest = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { imageBase64 } = req.body;
      const imageBuffer = Buffer.from(imageBase64, "base64");

      await this.instagramBot.postToInsta(imageBuffer);
      res.status(200).send("Postagem no Instagram bem-sucedida!");
    } catch (error) {
      console.error("Erro ao postar no Instagram:", error);
      res.status(500).send("Erro ao postar no Instagram");
    }
  };
}

const router = express.Router();
const instagramController = new InstagramController();

router.post("/post", (req, res) => {
  instagramController.handlePostRequest(req, res);
});

export default router;
