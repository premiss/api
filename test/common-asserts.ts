import { strict as assert } from "assert";

export const timingAssert = (value: bigint): void =>
{
	assert.equal(/^[1-9]\d*$/.test(String(value)), true, "An exam result should have timing");
};