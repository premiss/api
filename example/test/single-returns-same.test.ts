import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class SingleReturnsSameTest implements Proof
{
	private static readonly single = "1";
	private static readonly expected = 1;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(SingleReturnsSameTest.single);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, SingleReturnsSameTest.expected, `Calling add with single number should return the same number ${SingleReturnsSameTest.single}, but returned '${this.sum}'`);
	}
}