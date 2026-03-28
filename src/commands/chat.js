import { getHistory, addMessage, clearHistory } from '../services/memoryService.js'
import { generateReply } from '../services/geminiService.js'
import logger from '../utils/logger.js'

export async function handleChat(message, userMessage) {
  const userId = message.author.id

  const history = getHistory(userId)

  await message.channel.sendTyping()

  logger.info(`Chat request from ${message.author.tag}: "${userMessage}"`)

  const reply = await generateReply(userId, userMessage, history)

  if (reply.success) {
    addMessage(userId, 'user', userMessage)
    addMessage(userId, 'model', reply.text)
  }

  const responseText = reply.text.length > 1900
    ? reply.text.slice(0, 1900) + '...'
    : reply.text

  message.reply(responseText)
}

export function handleReset(message) {
  clearHistory(message.author.id)
  message.reply('History percakapan kamu sudah direset!')
}