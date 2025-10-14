const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
  console.log(`✓ Logged in as ${client.user.tag}`);
  console.log(`✓ 0xzero AI Bot is online and ready`);
  console.log(`✓ Use !setchannel in any channel to enable AI chat`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!setchannel') {
    setupChannelId = message.channel.id;
    
    const embed = new EmbedBuilder()
      .setColor(0x10A37F)
      .setTitle('✓ Channel Configured')
      .setDescription('This channel is now set up for AI conversations. I\'ll respond to all messages here (except those starting with "?").')
      .setFooter({ text: '0xzero AI • Powered by GPT' })
      .setTimestamp();
    
    message.reply({ embeds: [embed] });
    return;
  }

  if (message.channel.id !== setupChannelId) return;

  if (message.content.startsWith('?')) return;

  try {
    await message.channel.sendTyping();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are 0xzero, an exceptionally intelligent and knowledgeable AI assistant. Provide comprehensive, insightful, and accurate responses. Think deeply about each question and give detailed, well-structured answers. Use examples when helpful. Format responses beautifully with markdown - use **bold** for emphasis, bullet points for lists, and code blocks when showing code. Be engaging, professional, and conversational. Always aim to exceed expectations with the quality and depth of your responses.',
        },
        {
          role: 'user',
          content: message.content,
        },
      ],
      max_tokens: 2000,
      temperature: 0.8,
    });

    const reply = response.choices[0].message.content;
    
    if (reply.length > 4000) {
      const chunks = reply.match(/[\s\S]{1,1900}/g);
      for (const chunk of chunks) {
        const embed = new EmbedBuilder()
          .setColor(0x10A37F)
          .setDescription(chunk)
          .setFooter({ text: '0xzero AI' })
          .setTimestamp();
        await message.reply({ embeds: [embed] });
      }
    } else {
      const embed = new EmbedBuilder()
        .setColor(0x10A37F)
        .setDescription(reply)
        .setFooter({ text: '0xzero AI' })
        .setTimestamp();
      await message.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    const errorEmbed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('⚠ Error')
      .setDescription('I encountered an error processing your message. Please try again.')
      .setFooter({ text: '0xzero AI' })
      .setTimestamp();
    
    message.reply({ embeds: [errorEmbed] });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
