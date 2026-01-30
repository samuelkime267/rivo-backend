import crypto from "crypto";

export const generateToken = (options = { expiresInMinutes: 10 }) => {
  const { expiresInMinutes } = options;

  // generate secure random 32-byte token
  const token = crypto.randomBytes(32).toString("hex");

  // hash it before storing in DB
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // optional expiry date
  const expiresAt = expiresInMinutes
    ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
    : undefined;

  return {
    token,
    hashedToken,
    expiresAt,
  };
};
