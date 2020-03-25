import { ExamResult, Proof } from "./";

export class Examiner
{
	public async probe(proof: Proof): Promise<ExamResult> {
		try {
			await proof.assert();
		}
		catch
		{
			return { passed: false };
		}

		return { passed: true };
	}
}