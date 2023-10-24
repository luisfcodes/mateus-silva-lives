import "dotenv/config";

import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const token = sign({
  exp: Date.now() + 1000 * 60 * 60 * 24, // 1 day
  data: {
    sub: "@luisfcodes",
  },
  secret: process.env.JWT_SECRET as string,
});

const decoded = verify({
  token,
  secret: process.env.JWT_SECRET as string,
});

console.log(decoded);
