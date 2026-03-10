import crypto from "crypto";
import { encrypt } from "@/lib/encryption";

export function generateStreamKey() {
  const randomPart = crypto.randomBytes(24).toString("hex");
  const streamKey = `rivo_live_${randomPart}`;

  const encryptedStreamKey = encrypt(streamKey);

  return { streamKey, encryptedStreamKey };
}
