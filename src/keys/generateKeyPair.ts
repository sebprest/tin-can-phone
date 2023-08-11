import forge from "node-forge";
import path from "path";
import fs from "fs";

export function generateKeyPair(user: string): {
  publicKey: string;
  privateKey: string;
} {
  // Generate a keypair using RSA
  const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);

  // Convert the keys to PEM format
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

  // Save the keys to files
  const keyPath = path.join(process.cwd(), "keys");

  fs.writeFileSync(path.join(keyPath, `${user}.pub.pem`), publicKeyPem);
  fs.writeFileSync(path.join(keyPath, `${user}.priv.pem`), privateKeyPem);

  return { publicKey: publicKeyPem, privateKey: privateKeyPem };
}
