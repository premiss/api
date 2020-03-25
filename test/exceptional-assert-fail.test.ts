import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";

export class ExceptionalAssertFailTest implements Proof
{
	public async assert(): Promise<void> {
		throw new Error("Kaboom!?");
	}

	public async test (examiner: Examiner): Promise<void>
	{
		const result = await examiner.probe(this);
		assert.equal(result.passed, false, "An exception throw during assert should fail");
	}
}