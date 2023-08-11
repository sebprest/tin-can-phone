import yargs from "yargs";
import { encryptCommand, decryptCommand, createUser } from "./commands";

yargs
  .command(encryptCommand)
  .command(decryptCommand)
  .command(createUser)
  .demandCommand(1, "Please specify a command.")
  .help().argv;
