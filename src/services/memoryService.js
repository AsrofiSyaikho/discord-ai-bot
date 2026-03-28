// Simpan history per userId pakai Map — cukup untuk portofolio
const histories = new Map()

const MAX_HISTORY = 10 // maksimal 10 pasang pesan disimpan

export function getHistory(userId) {
  return histories.get(userId) ?? []
}

export function addMessage(userId, role, text) {
  const history = getHistory(userId)

  history.push({ role, parts: [{ text }] })

  // Jaga supaya tidak terlalu panjang, potong dari depan
  if (history.length > MAX_HISTORY * 2) {
    history.splice(0, 2)
  }

  histories.set(userId, history)
}

export function clearHistory(userId) {
  histories.delete(userId)
}