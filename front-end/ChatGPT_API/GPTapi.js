import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import * as fs from "fs";

config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(PORT));

const jsonData = fs.readFileSync("../../apps/hello_world.json", "utf8");

const configuration = new Configuration({
  organization: "org-ZtuhcaWbvGeEAi1i3nAU9e1j",
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat_input", async (req, res) => {
  let { value } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: `without explanations, ${value}, and give input and output variables if any`,
      },
    ],
  });
  res.json(completion.data.choices[0].message.content);
});
