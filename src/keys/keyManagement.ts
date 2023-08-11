import fs from "fs";
import path from "path";

function loadKey(user: string, keyType: "pub" | "priv"): string {
  // Define the path to the key file for the given user and key type
  const keyPath = path.join(process.cwd(), "keys", `${user}.${keyType}.pem`);

  try {
    // Read the key from the file
    const keyPem = fs.readFileSync(keyPath, "utf8");
    return keyPem;
  } catch (error) {
    console.error(`Failed to load ${keyType} key for user ${user}!`);
    console.error(`Expected to find it at ${keyPath}.`);
    console.error(
      `Ensure you've created user ${user} with the create-user command`,
    );
    throw new Error(`Failed to load ${keyType} key for user ${user}`);
  }
}

export function loadPublicKey(user: string): string {
  return loadKey(user, "pub");
}

export function loadPrivateKey(user: string): string {
  return loadKey(user, "priv");
}
