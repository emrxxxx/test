const { Client } = require('discord.js-selfbot-v13');

const client = new Client();
const token = process.env.DC_TOKEN;
const onlineSeconds = parseInt(process.env.ONLINE_SECONDS || '14400', 10);

if (!token) process.exit(1);

function getTRHours() {
  const now = new Date();
  return (now.getUTCHours() + 3) % 24;
}

function msUntilNextTRHour(targetHour) {
  const now = new Date();
  const nowTR = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const nextTarget = new Date(nowTR);
  nextTarget.setHours(targetHour, 0, 0, 0);
  if (nowTR.getHours() >= targetHour) nextTarget.setDate(nextTarget.getDate() + 1);
  return nextTarget.getTime() - nowTR.getTime();
}

const currentHourTR = getTRHours();
if (currentHourTR >= 1 && currentHourTR < 12) process.exit(0);

client.once('ready', async () => {
  await client.user.setPresence({ status: 'idle' });
  const timeUntilNoon = msUntilNextTRHour(12);
  const logoutTime = Math.min(onlineSeconds * 1000, timeUntilNoon);
  setTimeout(() => client.destroy().then(() => console.log('Logged out')), logoutTime);
});

client.login(token);
