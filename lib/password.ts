import argon2 from 'argon2'

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 64 * 1024,
    timeCost: 3,
    parallelism: 3
} as const

export async function createPasswordDigest(password: string) {
    return await argon2.hash(password, ARGON2_OPTIONS)
}

export async function checkPassword(passwordDigest: string, password: string) {
    return await argon2.verify(passwordDigest, password)
}

const DECOY_DIGEST = '$argon2id$v=19$m=65536,p=3,t=3$noXELR83k4HWxFFfYpnnAA$xko7bkqAaTIQUmzucvNM+edIQ0/+LbG55FealwvZIhU'

export async function checkPasswordAgainstDecoy(password: string) {
    try {
        await argon2.verify(DECOY_DIGEST, password)
    } catch {}
    return false
}
