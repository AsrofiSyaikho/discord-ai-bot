import { handleChat, handleReset } from '../commands/chat.js'
import { handleHelp } from '../commands/help.js'
import { handleInspirasi } from '../commands/inspirasi.js'
import { isOnCooldown, getRemainingCooldown, setCooldown } from '../services/cooldownService.js' // tambah ini
import logger from '../utils/logger.js'

export function setupMessageHandler(client) {
  client.on('messageCreate', async (message) => {

    if (message.author.bot) return

    const content = message.content.trim()
    const isMentioned = message.mentions.has(client.user)

    if (content === ';help') return handleHelp(message)
    if (content === ';reset') return handleReset(message)
    if (content === ';inspirasi') return handleInspirasi(message)

    if (!isMentioned) return

    // Cek & set cooldown duluan — sebelum apapun
    if (isOnCooldown(message.author.id)) {
    const remaining = getRemainingCooldown(message.author.id)
    return message.reply(`Pelan-pelan ya! Coba lagi dalam **${remaining} detik**.`)
    }
    setCooldown(message.author.id)

    // Baru cek pesan kosong
    const userMessage = content.replace(`<@${client.user.id}>`, '').trim()

    if (!userMessage) {
    return message.reply('Halo! Ada yang bisa saya bantu? Ketik `;help` untuk melihat cara pakai.')
    }

    logger.info(`Message from ${message.author.tag}`)
    await handleChat(message, userMessage)
  })
}