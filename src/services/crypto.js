import blake2b from "blake2b";
import {Buffer} from "buffer";

export const hash = (msg) => {
  const output = new Uint8Array(64);
  const input = Buffer.from(msg);
  
  return blake2b(output.length)
  .update(input)
  .digest("hex");
}
