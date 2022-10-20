import { expect, test } from 'vitest'
import { aesDecrypt, aesEncrypt, pbkdf2 } from '../src/index.js'

test('pbdf2', async () => {
	const key = await pbkdf2({
		password: '121212',
		salt: Buffer.from('2Rj6a45U7sJFOTEAhE8N1w==', 'base64'),
	})
	expect(key.toString('base64')).toBe(
		'LsyRUO6ILDO1DTVEa3m/ALEUHXjeMndZ1gnNNrzsSZelfYG1OyBKMoieb8B1mw7I4dUCskMxRtQNWEHQBC1GsA==',
	)
})

test('encrypt data', async () => {
	const data =
		'The correct way is to generate a random salt during encryption (as it already happens) and then pass this salt to the decrypting side. Like the IV, the salt is not secret and is usually concatenated with the ciphertext, e.g. salt|iv|ciphertext. By the way, a separator is not necessary because both sides can perform the separation based on th'
	const encrypted = await aesEncrypt(data, '121212')
	console.log(encrypted)
	const decrypted = await aesDecrypt(encrypted, '121212')
	expect(decrypted).toBe(data)
})

test('decrypt data from dart', async () => {
	const data = 's2zivTgU8zdPkAYGYWNVUpshrCg5AhiCbb4O6DmbDy+DmHkMwVgRYQKi8+xPbDIn'
	const decrypted = await aesDecrypt(data, '121212')
	expect(decrypted).toBe('test')
})
