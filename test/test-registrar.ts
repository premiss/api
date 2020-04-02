import { ExamResult, Registrar } from "../src";

export class TestRegistrar implements Registrar
{
	private readonly undefinedExamResult: ExamResult = undefined as unknown as ExamResult;
	private readonly examResults: ExamResult[] = [];

	public async record(examResult: ExamResult): Promise<void>
	{
		this.examResults.push(examResult);
	}

	public popLastRecord(): ExamResult
	{
		return this.examResults.pop() || this.undefinedExamResult;
	}
}