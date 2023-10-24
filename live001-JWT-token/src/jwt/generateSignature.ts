import { createHmac } from "crypto";

interface IGenerateSignatureOptions {
  header: string;
  payload: string;
  secret: string;
}

export function genearateSignature({
  header,
  payload,
  secret,
}: IGenerateSignatureOptions) {
  const hmac = createHmac("sha256", secret);

  return hmac.update(`${header}.${payload}`).digest("base64url");
}
