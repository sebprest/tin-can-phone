import forge from "node-forge";
import { loadPublicKey, loadPrivateKey } from "../keys/keyManagement";
import { AES_KEY_SIZE, IV_LENGTH } from "./consts";

export function encryptMessage(
  sender: string,
  receiver: string,
  message: string,
): string {
  // Generate a random symmetric key for AES encryption
  const symmetricKey = forge.random.getBytesSync(AES_KEY_SIZE);

  // Encrypt the message using AES
  const iv = forge.random.getBytesSync(IV_LENGTH);
  const cipher = forge.cipher.createCipher("AES-GCM", symmetricKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(message, "utf8"));
  cipher.finish();
  const encryptedMessage = cipher.output.getBytes();
  const tag = cipher.mode.tag.getBytes();

  // Load the private key of the sender
  const senderPrivateKeyPem = loadPrivateKey(sender);
  const senderPrivateKey = forge.pki.privateKeyFromPem(senderPrivateKeyPem);

  // Sign the original message with the sender's private key
  const md = forge.md.sha256.create();
  md.update(encryptedMessage);
  const signature = senderPrivateKey.sign(md);

  // Load the public key of the receiver
  const receiverPublicKeyPem = loadPublicKey(receiver);
  const receiverPublicKey = forge.pki.publicKeyFromPem(receiverPublicKeyPem);

  // Encrypt the symmetric key with the receiver's public key
  const encryptedKey = receiverPublicKey.encrypt(symmetricKey, "RSA-OAEP");

  // Combine the encrypted symmetric key and the combined message with signature
  const finalCombinedMessage = forge.util.encode64(
    iv + tag + encryptedKey + signature + encryptedMessage,
  );

  return finalCombinedMessage;
}
