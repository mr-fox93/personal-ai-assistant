import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("Brak tokena TELEGRAM_BOT_TOKEN w .env!");
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log("🚀 Bot się uruchamia...");

bot.start((ctx) => {
  ctx.reply("Cześć! Jestem botem AI. Możesz mi zadać pytanie.");
});

bot.on("text", (ctx) => {
  ctx.reply(`Napisałeś: ${ctx.message.text}`);
});

bot.launch();

console.log("✅ Bot działa! Oczekuje na wiadomości...");
