import { createHmac } from "crypto";

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign({ data, exp, secret }: ISignOptions) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...data,
    iat: Date.now(),
    exp,
  };

  const base64EncodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );

  const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const hmac = createHmac("sha256", secret);

  const signature = hmac
    .update(`${base64EncodedHeader}.${base64EncodedPayload}`)
    .digest("base64url");

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
