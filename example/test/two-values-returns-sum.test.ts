import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class TwoValuesReturnsSumTest implements Proof
{
	private static readonly twoValues = "1,2";
	private static readonly expected = 3;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(TwoValuesReturnsSumTest.twoValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, TwoValuesReturnsSumTest.expected, `Calling add with two numbers should return ${TwoValuesReturnsSumTest.expected}, but was ${this.sum}`);
	}
}