import { strict as assert } from "assert";
import { Examiner, Proof } from "../src/";

export class EmptyAssertPassTest implements Proof
{
	public async assert(): Promise<void> {
		// don't throw
	}

	public async test (examiner: Examiner): Promise<void>
	{
		const result = await examiner.probe(this);
		assert.equal(result.passed, true, "An empty assert should pass");
	}
}