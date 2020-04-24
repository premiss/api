const escapeCharactersMatcher = /[.*+?^${}()|[\]\\]/g;
const escapeCharacterReplacer = "\\$&";

export const regexEscape = (value: string): string =>
{
	return value.replace(escapeCharactersMatcher, escapeCharacterReplacer);
};