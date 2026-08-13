import argon2 from 'argon2'

export async function createPasswordDigest(password: string) {
    return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 64 * 1024, // 64 MiB
        timeCost: 10,
        parallelism: 3
    })
}

export async function checkPassword(passwordDigest: string, password: string) {
    return await argon2.verify(passwordDigest, password)
}