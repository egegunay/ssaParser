import { events } from "./events.ts";

interface ssa {
	header: string[],
	styles: string[],
	events: events
}

declare global {
	interface String {
		cleanSplit(): string[];
	}
}

String.prototype.cleanSplit = function (): string[] {
	return this.split("\n").filter((text: string) => text.length > 0)
};

export class ssaParser {
	parse(input: string): ssa {
		const styleHeader: string = input.includes("[V4+ Styles]") ? "[V4+ Styles]" : "[V4 Styles]";
		const ssaHeader: string[] = input.split(styleHeader)[0].cleanSplit();
		const ssaStyles: string[] = (styleHeader + input.split(styleHeader)[1]).split("[Events]")[0].cleanSplit();
		const ssaEvents: events = new events(('[Events]' + input.split("[Events]")[1]).cleanSplit());

		const parsed: ssa = { header: ssaHeader, styles: ssaStyles, events: ssaEvents };
		return parsed
	}
}