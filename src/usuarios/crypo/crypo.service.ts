import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from 'util';

const iv = randomBytes(16);

export class CryptographyPassword {
    async criptografar (password: string) {
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv("aes-256-ccm", key, iv);

        const textToEncrypt = "Nest";

        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt, 'utf-8'),
            cipher.final()
        ]); 
        return encryptedText;
    }
    async descriptografar (password: Buffer): Promise<Buffer>{
        const decipher = createDecipheriv("aes-256-ccm", password, iv);
        
        const descryptedText = Buffer.concat(
            [
                decipher.update(password),
                decipher.final()
            ]
        );
        return descryptedText;
    }
}