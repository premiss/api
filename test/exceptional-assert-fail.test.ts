import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";
import { timingAssert } from "./common-asserts";
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
		assert.equal(examResult.passed, false, "An exception thrown during assert should fail");
		assert.equal(examResult.error?.message, ExceptionalAssertFailTest.errorMessage, "An failing result should have an error");
		timingAssert(examResult.elapsedNanoseconds);
	}
}