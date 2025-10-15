require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, PermissionFlagBits } = require('discord.js');
const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
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
  if (!message.guild) return;

  if (message.content === '!setchannel') {
    setupChannelId = message.channel.id;
    
    const embed = new EmbedBuilder()
      .setColor(0x10A37F)
      .setTitle('✓ Channel Configured')
      .setDescription('This channel is now set up for AI conversations!\n\n**📖 How to Use:**\n• Just type any message and I\'ll respond with AI-powered answers\n• Messages starting with "?" will be ignored\n• Ask me anything - coding help, explanations, advice, or general questions\n\n**Available Commands:**\n• `!setchannel` - Set up AI chat in this channel\n• `!purge <number>` - Delete messages (1-100)\n• `!help` - Show this help message')
      .setFooter({ text: '0xzero AI • Made by Taktfuld' })
      .setTimestamp();
    
    message.reply({ embeds: [embed] });
    return;
  }

  if (message.content.startsWith('!purge')) {
    try {
      const args = message.content.split(' ');
      const amount = parseInt(args[1]);

      if (!amount || amount < 1 || amount > 100) {
        const errorEmbed = new EmbedBuilder()
          .setColor(0xFF0000)
          .setTitle('❌ Invalid Amount')
          .setDescription('Please provide a number between 1 and 100.\n\n**Usage:** `!purge <number>`\n**Example:** `!purge 10`')
          .setFooter({ text: '0xzero AI • Made by Taktfuld' })
          .setTimestamp();
        
        message.reply({ embeds: [errorEmbed] });
        return;
      }

      const messages = await message.channel.messages.fetch({ limit: amount + 1 });
      await message.channel.bulkDelete(messages, true);

      const successEmbed = new EmbedBuilder()
        .setColor(0x10A37F)
        .setTitle('✓ Messages Deleted')
        .setDescription(`Successfully deleted **${amount}** messages.`)
        .setFooter({ text: '0xzero AI • Made by Taktfuld' })
        .setTimestamp();
      
      const reply = await message.channel.send({ embeds: [successEmbed] });
      
      setTimeout(() => reply.delete().catch(() => {}), 3000);
    } catch (error) {
      console.error('Error purging messages:', error);
      
      const errorEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('⚠ Error')
        .setDescription('Failed to delete messages. Make sure the bot has **Manage Messages** permission and messages are not older than 14 days.')
        .setFooter({ text: '0xzero AI • Made by Taktfuld' })
        .setTimestamp();
      
      message.reply({ embeds: [errorEmbed] });
    }
    return;
  }

  if (message.content === '!help') {
    const helpEmbed = new EmbedBuilder()
      .setColor(0x10A37F)
      .setTitle('🤖 0xzero AI Bot - Help')
      .setDescription('**How It Works:**\nI\'m an AI-powered assistant that responds to your messages with intelligent, detailed answers using GPT-4o.\n\n**📖 Usage:**\n• Just type any message in the configured channel\n• I\'ll respond with brief, clear answers\n• Messages starting with "?" are ignored (for other bots)\n\n**⚙️ Commands:**\n• `!setchannel` - Set up AI chat in current channel\n• `!purge <number>` - Delete messages (1-100)\n• `!help` - Show this help message\n\n**💡 Tips:**\n• Ask detailed questions for better answers\n• Say "explain in detail" or "elaborate" for longer responses\n• I can help with coding, explanations, advice, and more')
      .setFooter({ text: '0xzero AI • Made by Taktfuld' })
      .setTimestamp();
    
    message.reply({ embeds: [helpEmbed] });
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
          content: 'You are 0xzero, an intelligent AI assistant. Give concise, clear, and accurate answers by default. Only provide detailed explanations when the user specifically asks for them (e.g., "explain in detail", "tell me more", "elaborate"). Use markdown formatting - **bold** for emphasis, bullet points for lists, and code blocks for code. Be professional and helpful.',
        },
        {
          role: 'user',
          content: message.content,
        },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const reply = response.choices[0].message.content;
    
    if (reply.length > 4000) {
      const chunks = reply.match(/[\s\S]{1,1900}/g);
      for (const chunk of chunks) {
        const embed = new EmbedBuilder()
          .setColor(0x10A37F)
          .setDescription(chunk)
          .setFooter({ text: '0xzero AI • Made by Taktfuld' })
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
