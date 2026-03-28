const lastUsed = new Map()

const COOLDOWN_SECONDS = 3

export function isOnCooldown(userId) {
  const last = lastUsed.get(userId)
//   console.log(`[COOLDOWN CHECK] userId: ${userId}, lastUsed: ${last}, now: ${Date.now()}`)
  if (!last) return false

  const elapsed = (Date.now() - last) / 1000
//   console.log(`[COOLDOWN CHECK] elapsed: ${elapsed}s, limit: ${COOLDOWN_SECONDS}s, onCooldown: ${elapsed < COOLDOWN_SECONDS}`)
  return elapsed < COOLDOWN_SECONDS
}

export function getRemainingCooldown(userId) {
  const last = lastUsed.get(userId)
  if (!last) return 0
  const elapsed = (Date.now() - last) / 1000
  return Math.ceil(COOLDOWN_SECONDS - elapsed)
}

export function setCooldown(userId) {
  lastUsed.set(userId, Date.now())
//   console.log(`[COOLDOWN SET] userId: ${userId}, time: ${Date.now()}`)
}