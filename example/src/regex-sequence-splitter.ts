import { SequenceSplit } from "./sequence-split";

export const regexSequenceSplitFactory = (delimiterRegex: RegExp): SequenceSplit => {
	return (sequence: string): string[] =>
	{
		return sequence.split(delimiterRegex);
	};
};