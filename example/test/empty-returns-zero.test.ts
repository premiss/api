import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class EmptyReturnsZeroTest implements Proof
{
	private static readonly empty = "";
	private static readonly expected = 0;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(EmptyReturnsZeroTest.empty);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, EmptyReturnsZeroTest.expected, `Calling add with empty string should return 0, but returned '${this.sum}'`);
	}
}