import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class IgnoreLargeValuesReturnsSmallerSumTest implements Proof
{
	private static readonly someLargeValues = "2,1001";
	private static readonly expected = 2;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(IgnoreLargeValuesReturnsSmallerSumTest.someLargeValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, IgnoreLargeValuesReturnsSmallerSumTest.expected, `Calling add with some large values should return ${IgnoreLargeValuesReturnsSmallerSumTest.expected}, but was '${this.sum}'`);
	}
}