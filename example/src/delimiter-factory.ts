import { regexEscape } from "./regex-escape";

const defaultDelimiter = /[,\n]/g;
const customDelimiterMatcher = /^\/\/(?:(.)|((?:\[.*?])+))\n.*$/;
const customMultiDelimiterMatcher = /\[.*?]/g;
const customMultiDelimiterReplacer = /[[\]]/g;
const customSingleCharacterDelimiterIndex = 1;
const customMultiCharacterDelimiterIndex = 2;
const customMultiDelimiterReplacerValue = "";

const getCustomMultiDelimiter = (multiCharacterDelimiterValue: string): RegExp =>
{
	const matches = multiCharacterDelimiterValue.match(customMultiDelimiterMatcher) as string[];
	const delimiterToken = matches.map(match => regexEscape(match.replace(customMultiDelimiterReplacer, customMultiDelimiterReplacerValue))).join("|");
	return new RegExp(delimiterToken);
};

const getCustomDelimiterRegex = (matches: RegExpMatchArray): RegExp =>
{
	return matches[customMultiCharacterDelimiterIndex]
		? getCustomMultiDelimiter(matches[customMultiCharacterDelimiterIndex])
		: new RegExp(regexEscape(matches[customSingleCharacterDelimiterIndex]));
};

export const delimiterFactory = (sequence: string): RegExp =>
{
	const matches = sequence.match(customDelimiterMatcher);
	return matches
		? getCustomDelimiterRegex(matches)
		: defaultDelimiter;
};