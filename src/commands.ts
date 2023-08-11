import { CommandModule } from "yargs";
import { encryptMessage } from "./crypto/encryptMessage";
import { decryptMessage } from "./crypto/decryptMessage";
import { generateKeyPair } from "./keys/generateKeyPair";

export const encryptCommand: CommandModule = {
  command: "encrypt",
  describe: "Encrypt a message",
  builder: {
    sender: { type: "string", demandOption: true },
    receiver: { type: "string", demandOption: true },
    message: { type: "string", demandOption: true },
  },
  handler: (argv: any) => {
    console.log(encryptMessage(argv.sender, argv.receiver, argv.message));
  },
};

export const decryptCommand: CommandModule = {
  command: "decrypt",
  describe: "Decrypt a message",
  builder: {
    sender: { type: "string", demandOption: true },
    receiver: { type: "string", demandOption: true },
    message: { type: "string", demandOption: true },
  },
  handler: (argv: any) => {
    console.log(decryptMessage(argv.sender, argv.receiver, argv.message));
  },
};

export const createUser: CommandModule = {
  command: "create-user",
  describe: "Create a new user",
  builder: {
    user: { type: "string", demandOption: true },
  },
  handler: (argv: any) => {
    generateKeyPair(argv.user);
  },
};
