export function handleHelp(message) {
  const embed = {
    color: 0x5865f2,
    title: 'Cara pakai bot',
    fields: [
      { name: 'Chat dengan AI', value: 'Mention bot atau DM langsung\nContoh: `@BotKamu halo!`' },
      { name: 'Reset percakapan', value: 'Ketik `;reset` untuk hapus history chat' },
      { name: 'Bantuan', value: 'Ketik `;help` untuk tampilkan pesan ini' },
    ],
    footer: { text: 'Powered by Gemini AI' },
  }
  message.reply({ embeds: [embed] })
}