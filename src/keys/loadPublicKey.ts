import fs from "fs";
import { publicKeyPath } from "./utils";

function loadPublicKey(user: string): string {
  // Define the path to the key file for the given user and key type
  const keyPath = publicKeyPath(user);

  try {
    // Read the key from the file
    const keyPem = fs.readFileSync(keyPath, "utf8");
    return keyPem;
  } catch (error) {
    console.error(`Failed to load public key for user ${user}!`);
    console.error(`Expected to find it at ${keyPath}.`);
    console.error(
      `Ensure you've created user ${user} with the create-user command`,
    );
    throw new Error(`Failed to load public key for user ${user}`);
  }
}

export default loadPublicKey;
