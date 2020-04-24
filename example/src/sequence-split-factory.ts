import { delimiterFactory } from "./delimiter-factory";
import { regexSequenceSplitFactory } from "./regex-sequence-splitter";
import { SequenceSplit } from "./sequence-split";

export const sequenceSplitFactory = (sequence: string): SequenceSplit =>
{
	const delimiterMatcher = delimiterFactory(sequence);
	return regexSequenceSplitFactory(delimiterMatcher);
};
