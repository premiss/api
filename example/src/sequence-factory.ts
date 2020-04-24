const sequenceMatcher = /^\/\/.+?\n(.*)$/;
const sequenceIndex = 1;

export const sequenceFactory = function (sequence: string): string
{
	const matches = sequence.match(sequenceMatcher);
	return matches?.[sequenceIndex] || sequence;
};