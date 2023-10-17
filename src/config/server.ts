import express from "express";
import InstagramController from "../interfaces/controllers/InstagramController";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/instagram", InstagramController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
