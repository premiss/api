import { ExamResult, Proof } from "./";
export class Examiner
{
	public async probe(proof: Proof): Promise<ExamResult> {
		return { passed: true };
	}
}