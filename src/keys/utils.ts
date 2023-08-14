import path from "path";

export function publicKeyPath(user: string) {
  return path.join(process.cwd(), "public-keys", `${user}.pub.pem`);
}
export function privateKeyPath(user: string) {
  return path.join(process.cwd(), `${user}.priv.pem`);
}
