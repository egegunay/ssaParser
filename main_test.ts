import { assertEquals, ssaResult, ssaText } from "./deps.ts";
import { ssaParser } from "./src/main.ts";

const parser = new ssaParser;
const parseResult = parser.parse(ssaText).events.getCleanDialogueText().toString()

Deno.test({
	name: "First test",
	fn() {
		assertEquals(parseResult, ssaResult)
	}
})