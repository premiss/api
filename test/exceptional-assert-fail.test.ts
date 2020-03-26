import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";
import { TestRegistrar } from "./test-registrar";

export class ExceptionalAssertFailTest
{
	private static readonly errorMessage = "Kaboom!?";
	private readonly proof = new class implements Proof
	{
		public async assert(): Promise<void>
		{
			throw new Error(ExceptionalAssertFailTest.errorMessage);
		}
	};

	public async test(examiner: Readonly<Examiner>, testRegistrar: Readonly<TestRegistrar>): Promise<void>
	{
		await examiner.probe(this.proof);
		const examResult = testRegistrar.popLastRecord();
		assert.equal(examResult.passed, false, "An exception throw during assert should fail");
		assert.equal(/^[1-9]\d*$/.test(String(examResult.elapsedNanoseconds)), true, "An exam result should have timing");
		assert.equal(examResult.error?.message, ExceptionalAssertFailTest.errorMessage, "An failing result should have an error");
	}
}