import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import { jsonFormat } from "./json.js";
import * as fs from "fs";

config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(PORT));

let prompt;
let message = [
  {
    role: "system",
    content:
      "You will follow the conversation and respond to the queries asked by the 'user's content. You will act as the assistant",
  },
];

const configuration = new Configuration({
  organization: "org-ZtuhcaWbvGeEAi1i3nAU9e1j",
  apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/chat_input", async (req, res) => {
  let { value, edit, id } = req.body;
  const editJson = fs.readFileSync("../../apps/hello_world.json", {
    encoding: "utf8",
    flag: "r",
  });

  if (id === "new") {
    prompt = `without explanation, write a json code that collects input from a ${value} using this format: ${jsonFormat}`;
  } else if (id === "edit") {
    // prompt = `Edit the json code using this edit: ${edit}`;
    prompt = edit;
  }

  const newArr = (array, input, role) => {
    array.push({
      role: role,
      content: input,
    });
  };
  newArr(message, prompt, "user");

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: message,
    temperature: 0.2,
  });

  const datum = completion.data.choices[0].message.content;

  newArr(message, datum, "assistant");

  let b = datum.indexOf("{");
  function locations(substring, string) {
    let a = [],
      i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
    return a;
  }

  let c = locations("}", datum);

  fs.writeFileSync(
    "../../apps/hello_world.json",
    datum.slice(b, c[c.length - 1] + 1)
  );
  setTimeout(() => {
    res.json(datum.slice(b, c[c.length - 1] + 1));
  }, 1.5);
});
