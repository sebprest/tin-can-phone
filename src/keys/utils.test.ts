import { describe, it, expect } from "vitest";
import { publicKeyPath, privateKeyPath } from "./utils";

describe("publicKeyPath", () => {
  it("returns the path to the public key for the given user", () => {
    expect(publicKeyPath("alice")).toEqual(
      `${process.cwd()}/public-keys/alice.pub.pem`,
    );
  });
});

describe("privateKeyPath", () => {
  it("returns the path to the private key for the given user", () => {
    expect(privateKeyPath("alice")).toEqual(`${process.cwd()}/alice.priv.pem`);
  });
});
