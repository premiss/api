import { Proof } from "../src/";

export class EmptyAssertPassTest implements Proof
{
	public async assert(): Promise<void> {
		// don't throw
	}
}