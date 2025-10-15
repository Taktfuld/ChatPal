# Build & Setup Guide

## Prerequisites

- **Node.js** 16.11.0 or higher
- **npm** (comes with Node.js)
- Discord Bot Token
- OpenAI API Key

## Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd 0xzero-discord-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_api_key_here
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
```

### 4. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select your bot
3. Go to the **Bot** section
4. Enable these **Privileged Gateway Intents**:
   - ✅ Message Content Intent
   - ✅ Server Members Intent
5. Copy your bot token and add it to `.env`

### 5. OpenAI API Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file

## Running the Bot

### Development
```bash
npm start
```

The bot will start and log in to Discord. You should see:
```
✓ Logged in as 0xzero#2478
✓ 0xzero AI Bot is online and ready
```

## Bot Permissions

Make sure your bot has these permissions when inviting to a server:
- **Manage Messages** (for purge command)
- **Send Messages**
- **Embed Links**
- **Read Message History**

## Commands

- `!setchannel` - Set up AI chat in current channel
- `!purge <number>` - Delete messages (1-100)
- `!help` - Show help information

## Troubleshooting

**Bot doesn't respond:**
- Check if Message Content Intent is enabled in Discord Developer Portal
- Verify bot has proper permissions in the server

**"Invalid Token" error:**
- Double-check your `DISCORD_BOT_TOKEN` in `.env`

**OpenAI errors:**
- Verify your `AI_INTEGRATIONS_OPENAI_API_KEY` is valid
- Check your OpenAI account has credits

## Project Structure

```
0xzero-discord-bot/
├── index.js           # Main bot code
├── package.json       # Dependencies
├── .env              # Environment variables (create this)
├── .env.example      # Template for .env
├── README.md         # Project overview
└── BUILD.md          # This file
```

## Credits

**Made by Taktfuld** | Powered by GPT-4o
