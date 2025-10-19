const { Client } = require('discord.js-selfbot-v13');

const token = process.env.DC_TOKEN;
const onlineSeconds = parseInt(process.env.ONLINE_SECONDS || "14400", 10); // 4 saat

if (!token) {
  console.error("DC_TOKEN environment variable is missing.");
  process.exit(1);
}

const client = new Client();

client.once("ready", async () => {
  console.log(`Online`);
  await client.user.setPresence({
    status: "idle"
  });
  console.log(`Idle for ${onlineSeconds} seconds...`);
  setTimeout(async () => {
    console.log("Logging out...");
    await client.destroy();
  }, onlineSeconds * 1000);
});

client.login(token);
