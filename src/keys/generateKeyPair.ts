import forge from "node-forge";
import path from "path";
import fs from "fs";
import { publicKeyPath, privateKeyPath } from "./utils";

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
  fs.writeFileSync(publicKeyPath(user), publicKeyPem);
  fs.writeFileSync(privateKeyPath(user), privateKeyPem);

  console.log(`Your private key was written to ${privateKeyPath(user)}`);
  console.log("Keep it safe!");

  return { publicKey: publicKeyPem, privateKey: privateKeyPem };
}
