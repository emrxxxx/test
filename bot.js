const { Client } = require('discord.js-selfbot-v13');

const client = new Client();
const token = process.env.DC_TOKEN;
const onlineSeconds = parseInt(process.env.ONLINE_SECONDS || '14400', 10);

if (!token) {
  console.error('DC_TOKEN missing');
  process.exit(1);
}

client.once('ready', async () => {
  console.log('Online');
  await client.user.setPresence({ status: 'idle' });
  setTimeout(() => client.destroy().then(() => console.log('Logged out')), onlineSeconds * 1000);
});

client.login(token);
