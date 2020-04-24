import { Proof } from "@premiss/api";
import { strict as assert } from "assert";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class AnyLengthDelimiterReturnsSumTest implements Proof
{
	private static readonly definedDelimiterValues = "//[***]\n1***2***3";
	private static readonly expected = 6;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(AnyLengthDelimiterReturnsSumTest.definedDelimiterValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, AnyLengthDelimiterReturnsSumTest.expected, `Calling add with any length delimiter should have returned ${AnyLengthDelimiterReturnsSumTest.expected}, but was '${this.sum}'`);
	}
}