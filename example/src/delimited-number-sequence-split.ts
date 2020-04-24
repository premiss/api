import { sequenceFactory } from "./sequence-factory";
import { sequenceSplitFactory } from "./sequence-split-factory";

export const delimitedNumberSequenceSplit = (sequence: string): string[] =>
{
	const sequenceSplit = sequenceSplitFactory(sequence);
	const sequenceToSplit = sequenceFactory(sequence);
	return sequenceSplit(sequenceToSplit);
};