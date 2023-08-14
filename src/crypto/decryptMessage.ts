import forge from "node-forge";
import fs from "fs";
import loadPublicKey from "../keys/loadPublicKey";
import {
  IV_LENGTH,
  TAG_LENGTH,
  RSA_KEY_LENGTH,
  SIGNATURE_LENGTH,
} from "./consts";

export function decryptMessage(
  receiverPrivateKeyPath: string,
  sender: string,
  message: string,
): string {
  // Decode the combined encrypted message
  const decodedData = forge.util.decode64(message);
  const buffer = forge.util.createBuffer(decodedData);

  const iv = buffer.getBytes(IV_LENGTH);
  const tag = buffer.getBytes(TAG_LENGTH);
  const encryptedKey = buffer.getBytes(RSA_KEY_LENGTH);
  const signature = buffer.getBytes(SIGNATURE_LENGTH);
  const encryptedMessage = buffer.getBytes();

  // Load the receiver's private key
  const receiverPrivateKeyPem = fs.readFileSync(receiverPrivateKeyPath, "utf8");
  const receiverPrivateKey = forge.pki.privateKeyFromPem(receiverPrivateKeyPem);

  // Decrypt the symmetric key using the receiver's private key
  const symmetricKey = receiverPrivateKey.decrypt(encryptedKey, "RSA-OAEP");

  // Verify the signature using the sender's public key
  const senderPublicKeyPem = loadPublicKey(sender);

  const senderPublicKey = forge.pki.publicKeyFromPem(senderPublicKeyPem);
  const md = forge.md.sha256.create();
  md.update(encryptedMessage);
  const verified = senderPublicKey.verify(md.digest().bytes(), signature);
  if (!verified) {
    throw new Error("Signature verification failed");
  }

  // Decrypt the message using AES-GCM
  const decipher = forge.cipher.createDecipher("AES-GCM", symmetricKey);
  decipher.start({ iv: iv, tagLength: 128, tag: forge.util.createBuffer(tag) });
  decipher.update(forge.util.createBuffer(encryptedMessage));
  const result = decipher.finish();
  if (!result) {
    throw new Error("Failed to decrypt message");
  }

  return decipher.output.toString();
}
