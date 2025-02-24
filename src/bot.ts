import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import OpenAI from "openai";
import PROMPT from "./prompt";

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("Brak tokena TELEGRAM_BOT_TOKEN w .env!");
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("🚀 Bot się uruchamia...");

bot.start((ctx) => {
  ctx.reply("Cześć! Jestem botem AI. Możesz mi zadać pytanie.");
});

bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Bezpośredni dostęp do 'response.choices[0]'
    const aiResponse =
      response.choices[0]?.message?.content || "Nie mogę odpowiedzieć.";
    ctx.reply(aiResponse);
  } catch (error) {
    console.error("Błąd OpenAI:", error);
    ctx.reply("Wystąpił problem z AI. Spróbuj ponownie później.");
  }
});

// Uruchomienie bota
bot.launch();
console.log("✅ Bot działa! Oczekuje na wiadomości...");
