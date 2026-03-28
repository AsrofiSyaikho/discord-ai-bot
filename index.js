import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { setupMessageHandler } from './src/handlers/messageHandler.js'
import logger from './src/utils/logger.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // wajib untuk baca isi pesan
    GatewayIntentBits.DirectMessages,
  ],
})

// Saat bot siap
client.once('ready', () => {
  logger.info(`Bot online sebagai ${client.user.tag}`)
})

// Setup semua handler
setupMessageHandler(client)

// Login
client.login(process.env.DISCORD_TOKEN)