import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";
import { TestRegistrar } from "./test-registrar";

export class ExceptionalAssertFailTest implements Proof
{
	public async assert(): Promise<void>
	{
		throw new Error("Kaboom!?");
	}

	public async test(examiner: Readonly<Examiner>, testRegistrar: Readonly<TestRegistrar>): Promise<void>
	{
		await examiner.probe(this);
		const examResult = testRegistrar.popLastRecord();
		assert.equal(examResult.passed, false, "An exception throw during assert should fail");
		assert.equal(/^[1-9]\d*$/.test(String(examResult.elapsedNanoseconds)), true, "An exam result should have timing");
	}
}