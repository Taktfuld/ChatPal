# Overview

0xzero is an AI-powered Discord bot that provides intelligent responses to user messages using OpenAI's GPT-4o model. The bot features a professional interface with OpenAI-style green theming, admin-controlled channel setup, and message management capabilities. Users can interact with the AI naturally in configured channels, with the bot designed to provide concise answers by default and detailed responses when explicitly requested.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Application Structure

**Single-File Architecture**: The entire bot logic is contained in `index.js`, implementing a straightforward event-driven architecture without complex abstraction layers. This monolithic approach was chosen for simplicity and ease of maintenance for a focused bot with limited scope.

## Discord Integration

**Discord.js v14 Framework**: Uses the official Discord.js library with the following key architectural decisions:

- **Gateway Intents**: Implements specific intents (Guilds, GuildMessages, MessageContent, GuildMembers) to receive only necessary events, optimizing bandwidth and processing
- **Event-Driven Model**: All functionality is triggered by Discord events (`ready`, `messageCreate`)
- **Embed-Based UI**: Uses Discord's EmbedBuilder for rich, styled responses with consistent branding (green #10A37F color scheme)
- **Permission Checking**: Leverages Discord's PermissionFlagBits for admin-level command validation

**Message Filtering Strategy**: Messages starting with "?" are ignored to prevent conflicts with other bots - a simple yet effective multi-bot coexistence pattern.

## AI Integration

**OpenAI API Client**: Direct integration with OpenAI's API using their official Node.js SDK:

- **Configurable Endpoint**: Uses environment variable for base URL, allowing flexibility to use OpenAI-compatible APIs or proxies
- **Model Selection**: Hardcoded to use GPT-4o for consistent performance
- **Stateless Design**: Each message is treated independently without conversation history, prioritizing simplicity over context retention

**Response Philosophy**: Default concise responses with ability to provide detailed answers when users explicitly request elaboration - balancing brevity with depth.

## State Management

**In-Memory Channel Configuration**: Uses a simple in-memory variable (`setupChannelId`) to track the configured AI channel:

- **Pros**: Zero external dependencies, instant access, simple implementation
- **Cons**: Configuration resets on bot restart, single-channel limitation per bot instance
- **Trade-off Rationale**: Chosen for minimal complexity; suitable for small-scale deployments where persistence isn't critical

## Configuration Management

**Environment Variables**: All sensitive credentials and configuration stored in `.env` file:
- Discord bot token
- OpenAI API key  
- OpenAI base URL

Uses dotenv package for loading, keeping secrets out of code and enabling easy deployment across environments.

## Command System

**Prefix-Based Commands**: Simple string matching for commands (!setchannel, !purge, !help):

- **No Command Framework**: Avoids dependency on command handling libraries for a minimal command set
- **Inline Permission Checks**: Admin permissions validated directly in message handler
- **Trade-off**: Less scalable than framework-based approaches, but sufficient for limited command scope

# External Dependencies

## Third-Party Services

**Discord API**: Core platform integration
- Requires bot token from Discord Developer Portal
- Needs specific Gateway Intents enabled (Message Content, Server Members)
- Uses Discord.js v14.23.2 as the client library

**OpenAI API**: AI response generation
- Requires API key from OpenAI Platform
- Configured for GPT-4o model
- Supports custom base URL for API endpoint flexibility
- Uses OpenAI SDK v6.3.0

## Node.js Packages

**Core Dependencies**:
- `discord.js` (^14.23.2) - Discord API wrapper and client
- `openai` (^6.3.0) - Official OpenAI API client
- `dotenv` (^17.2.3) - Environment variable management

**Runtime Requirements**: Node.js 16.11.0 or higher (enforced by discord.js dependency)

## No Database

The application intentionally avoids database dependencies, storing minimal state in memory. This architectural decision prioritizes:
- Simplicity of deployment
- Reduced infrastructure requirements
- Faster startup times
- Lower maintenance overhead

Future enhancements requiring persistence (conversation history, multi-channel support, user preferences) would necessitate adding a database solution.