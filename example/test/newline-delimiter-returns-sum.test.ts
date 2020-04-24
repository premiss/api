import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class NewlineDelimiterReturnsSumTest implements Proof
{
	private static readonly triangularValues = "1,3,6,10\n15";
	private static readonly expected = 35;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(NewlineDelimiterReturnsSumTest.triangularValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, NewlineDelimiterReturnsSumTest.expected, `Calling add with newline delimiter should have returned ${NewlineDelimiterReturnsSumTest.expected}, but was '${this.sum}'`);
	}
}