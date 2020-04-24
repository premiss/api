import { regexEscape } from "./regex-escape";

const defaultDelimiter = /[,\n]/g;
const customDelimiterMatcher = /^\/\/(?:(.)|((?:\[.*?])+))\n.*$/;
const customMultiDelimiterMatcher = /\[(.*?)]/g;
const customSingleCharacterDelimiterIndex = 1;
const customMultiCharacterDelimiterIndex = 2;
const customMultiDelimiterIndex = 1;

const getCustomMultiDelimiter = (multiCharacterDelimiterValue: string): RegExp =>
{
	const matches = multiCharacterDelimiterValue.matchAll(customMultiDelimiterMatcher);
	const delimiterToken = [...matches].map(match => regexEscape(match[customMultiDelimiterIndex])).join("|");
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