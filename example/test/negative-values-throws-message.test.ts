import { strict as assert } from "assert";
import { Proof } from "@premiss/api";
import { delimitedNumberSequenceSplit, StringCalculator } from "../src";

export class NegativeValuesThrowsMessageTest implements Proof
{
	private static readonly containsNegativeValues = "1,-2,5,-12,29";
	private static readonly expectedMessage = "negatives not allowed, found -2, -12";

	private calculator!: StringCalculator;
	private error!: Error;

	public async arrange(): Promise<void>
	{
		this.calculator = new StringCalculator(delimitedNumberSequenceSplit);
	}

	public async act(): Promise<void>
	{
		try
		{
			this.calculator.add(NegativeValuesThrowsMessageTest.containsNegativeValues);
		}
		catch (error)
		{
			this.error = error;
		}
	}

	public async assert(): Promise<void>
	{
		assert.equal(this.error?.message, NegativeValuesThrowsMessageTest.expectedMessage, `Calling add with any negative number should have thrown with message ${NegativeValuesThrowsMessageTest.expectedMessage}, but was ${this.error?.message}`);
	}
}