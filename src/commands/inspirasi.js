const daftarInspirasi = [
  "Jangan Lupa Bernafas",
]

export function handleInspirasi(message) {
  const random = daftarInspirasi[Math.floor(Math.random() * daftarInspirasi.length)]

  const embed = {
    color: 0x5865f2,
    title: 'Inspirasi hari ini',
    description: `*"${random}"*`,
    footer: { text: 'Lokotre' },
  }

  message.reply({ embeds: [embed] })
}