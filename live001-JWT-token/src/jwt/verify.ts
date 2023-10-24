import { genearateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyOptions) {
  const [header, payload, signature] = token.split(".");

  const validSignature = genearateSignature({
    header,
    payload,
    secret,
  });

  if (signature !== validSignature) {
    throw new Error("Invalid token");
  }

  const decodedPayload = Buffer.from(payload, "base64url").toString();

  const parsedPayload = JSON.parse(decodedPayload);

  if (parsedPayload.exp < Date.now()) {
    throw new Error("Expired token");
  }

  return parsedPayload;
}
