export class events {
	value: string[];
	constructor(name: string[]) {
		this.value = name;
	}

	private getFormatLength() {
		return this.value[1].split('Text')[0].match(/,/g)?.length || 0;
	}

	private splitAmount(separator: string, str: string, amount: number): string {
		const split = str.split(separator);
		const sliced = split.slice(amount);
		const joined = sliced.join(separator);
		return joined;
	}

	getFormat() {
		return this.value[1].split('Format:')[1].split(',').map(e => e.trim())
	}

	getDialogueText() {
		const ignoredFormatAmount = this.getFormatLength();
		const lines: string[] = [];
		this.value.slice(2).map(newline => {
			const result = this.splitAmount(',', newline, ignoredFormatAmount);
			lines.push(result)
		})
		return lines
	}

	getCleanDialogueText() {
		const lines = this.getDialogueText();
		const clean: string[] = [];
		lines.forEach(line => {
			const standardisedResult = line.split(/\{[^}]*\}/g).filter((text) => text.length > 0).join("; ");
			const cleanedResult = standardisedResult.split('\\N').join(' ');

			clean.push(cleanedResult)
		})

		return clean
	}
}
