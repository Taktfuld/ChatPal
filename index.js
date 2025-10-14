const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

let setupChannelId = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Bot is ready to receive messages!');
  console.log('Use !setchannel in any channel to set it as the AI chat channel');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!setchannel') {
    setupChannelId = message.channel.id;
    message.reply(`✅ This channel has been set up for AI chat! I'll respond to all messages here (except those starting with "?").`);
    return;
  }

  if (message.channel.id !== setupChannelId) return;

  if (message.content.startsWith('?')) return;

  try {
    await message.channel.sendTyping();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant in a Discord channel. Be conversational, friendly, and concise.',
        },
        {
          role: 'user',
          content: message.content,
        },
      ],
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;
    
    if (reply.length > 2000) {
      const chunks = reply.match(/.{1,2000}/g);
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } else {
      await message.reply(reply);
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    message.reply('Sorry, I encountered an error while processing your message. Please try again.');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
