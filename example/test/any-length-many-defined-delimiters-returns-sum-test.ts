import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class AnyLengthManyDefinedDelimitersReturnsSumTest implements Proof
{
	private static readonly definedDelimiterValues = "//[**][%$%]\n1**2%$%3";
	private static readonly expected = 6;

	private calculator!: StringCalculator;
	private sum!: number;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		this.sum = this.calculator.add(AnyLengthManyDefinedDelimitersReturnsSumTest.definedDelimiterValues);
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.sum, AnyLengthManyDefinedDelimitersReturnsSumTest.expected, `Calling add with any length many defined delimiters should have returned ${AnyLengthManyDefinedDelimitersReturnsSumTest.expected}, but was '${this.sum}'`);
	}
}