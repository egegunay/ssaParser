import "@std/dotenv/load";
export { assertEquals } from "jsr:@std/assert";

export const ssaText = Deno.env.get("ssa_text") ?? "Sorry! Fix your env.";
export const ssaResult = Deno.env.get("ssa_result") ?? "Sorry! Fix your env.";