import { Buffer } from "buffer";
import { TextEncoder } from "text-encoding";

global.Buffer = Buffer;

globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;
