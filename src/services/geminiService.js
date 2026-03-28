import { GoogleGenerativeAI } from '@google/generative-ai'
import logger from '../utils/logger.js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite', // model gratis, cepat, cukup untuk chatbot
  systemInstruction: 'You are a helpful and friendly assistant inside a Discord server. Keep responses concise and conversational.',
})

export async function generateReply(userId, userMessage, history) {
  try {
    const chat = model.startChat({ history })

    const result = await chat.sendMessage(userMessage)
    const response = result.response.text()

    return { success: true, text: response }
  } catch (error) {
    logger.error(`Gemini error for user ${userId}: ${error.message}`)
    return { success: false, text: 'Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi nanti.' }
  }
}