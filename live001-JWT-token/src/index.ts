import { sign } from "./jwt/sign";

const token = sign({
  exp: Date.now() + 1000 * 60 * 60 * 24, // 1 day
  data: {
    sub: "@luisfcodes",
  },
  secret: "secret",
});

console.log(token);
