import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class UnknownValuesReturnsSumTest implements Proof
{
	private static readonly manyValues = "2,1,3,4,7,11,18,29,47";
	private static readonly expected = 122;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(UnknownValuesReturnsSumTest.manyValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, UnknownValuesReturnsSumTest.expected, `Calling add with many numbers should return ${UnknownValuesReturnsSumTest.expected}, but was '${this.sum}'`);
	}
}