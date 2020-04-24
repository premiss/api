import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class DefineDelimiterReturnsSumTest implements Proof
{
	private static readonly definedDelimiterValues = "//;\n1;2";
	private static readonly expected = 3;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(DefineDelimiterReturnsSumTest.definedDelimiterValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, DefineDelimiterReturnsSumTest.expected, `Calling add with defined delimiter should have returned ${DefineDelimiterReturnsSumTest.expected}, but was '${this.sum}'`);
	}
}