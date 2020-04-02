import { strict as assert } from "assert";

export const timingAssert = (value: bigint): void =>
{
	assert.ok(value > 0, "An exam result should have timing");
};