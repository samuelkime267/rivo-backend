import crypto from "crypto";

export function hashKey(key: string) {
  const hashedStreamKey = crypto.createHash("sha256").update(key).digest("hex");
  return hashedStreamKey;
}
