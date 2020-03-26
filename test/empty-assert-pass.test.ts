import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";
import { TestRegistrar } from "./test-registrar";

export class EmptyAssertPassTest
{
	private readonly proof = new class implements Proof
	{
		public async assert(): Promise<void>
		{
			// don't throw
		}
	};

	public async test(examiner: Readonly<Examiner>, testRegistrar: Readonly<TestRegistrar>): Promise<void>
	{
		await examiner.probe(this.proof);
		const examResult = testRegistrar.popLastRecord();
		assert.equal(examResult.passed, true, "An empty assert should pass");
		assert.equal(/^[1-9]\d*$/.test(String(examResult.elapsedNanoseconds)), true, "An exam result should have timing");
		assert.equal(examResult.error, undefined, "An passing result should have no error");
	}
}