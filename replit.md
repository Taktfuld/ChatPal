# 0xzero AI Discord Bot

## Overview

This is a Discord bot that provides AI-powered chat responses in designated channels using OpenAI's GPT-4o-mini model. The bot allows server administrators to configure specific channels for AI interaction and responds to user messages intelligently while filtering out command-style messages (those starting with "?").

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework
- **Discord.js v14**: Core bot framework chosen for its comprehensive API coverage and active maintenance
- **Gateway Intents**: Uses GatewayIntentBits for Guilds, GuildMessages, and MessageContent to monitor and respond to messages
- **Event-driven architecture**: Relies on Discord.js event listeners (`ready`, `messageCreate`) for handling bot lifecycle and user interactions

### AI Integration
- **OpenAI GPT-4o**: Premium AI model selected for exceptional response quality and intelligence
- **Concise System Prompt**: Configured to provide clear, concise answers by default; detailed responses only when explicitly requested by user
- **Token Limit**: 600 max tokens for brief, focused answers (prevents overly long responses)
- **Optimized Temperature**: 0.8 temperature setting for creative yet accurate responses
- **OpenAI SDK v6**: Official SDK used for API communication with support for custom base URLs
- **Environment-based configuration**: API credentials stored in environment variables (`AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`)

### Message Processing Logic
- **In-memory channel storage**: Uses a simple variable (`setupChannelId`) to track the configured channel - does not persist across restarts
- **Message filtering**: Implements two-layer filtering:
  1. Ignores bot messages to prevent response loops
  2. Ignores messages starting with "?" to allow other bot commands
- **Typing indicator**: Sends typing status while processing AI requests for better UX

### Command System
- **Simple prefix-based commands**: Uses `!setchannel` command for channel configuration
- **Embed responses**: Uses Discord EmbedBuilder for rich, formatted confirmation messages
- **No command framework**: Direct string matching for simplicity given single command requirement

### Professional UI/UX
- **Consistent embed formatting**: ALL bot responses use Discord embeds with professional styling
- **OpenAI-inspired design**: Green color scheme (#10A37F) matching OpenAI's branding
- **Branded footers**: Every embed includes "0xzero AI • Made by Taktfuld" footer for consistent branding and creator credit
- **Timestamps**: All embeds include timestamps for professional appearance
- **Smart chunking**: Long responses (>4000 chars) are split into multiple embeds while preserving formatting and newlines
- **Error embeds**: Errors are displayed with red embeds for clear visual distinction
- **Typing indicator**: Shows typing status while processing AI requests for better UX

### Limitations & Design Tradeoffs
- **Single channel support**: Only one channel can be active at a time (overwrites on new `!setchannel` command)
- **No persistence**: Channel configuration is lost on bot restart - chosen for simplicity over database dependency
- **No conversation context**: Each message is processed independently without conversation history

## External Dependencies

### Third-party Services
- **Discord API**: Core platform integration for bot functionality
  - Requires bot token (`DISCORD_BOT_TOKEN`)
  - Requires Message Content Intent privilege enabled
  - Requires Server Members Intent privilege enabled

- **OpenAI API**: AI response generation
  - API Key: `AI_INTEGRATIONS_OPENAI_API_KEY`
  - Custom Base URL: `AI_INTEGRATIONS_OPENAI_BASE_URL` (supports proxy/custom endpoints)
  - Model: gpt-4o-mini

### NPM Packages
- **discord.js** (^14.23.2): Discord bot framework
- **openai** (^6.3.0): OpenAI API client

### Runtime Requirements
- **Node.js**: Version 16.11.0 or higher (required by discord.js)
- **Environment Variables**: 
  - `DISCORD_BOT_TOKEN`: Discord bot authentication
  - `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API authentication
  - `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API endpoint