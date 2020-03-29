import { ExamResult, Registrar } from "../src";

export class TestRegistrar implements Registrar
{
	private readonly undefinedExamResult: Readonly<ExamResult> = undefined as unknown as Readonly<ExamResult>;
	private readonly examResults: Readonly<ExamResult>[] = [];

	public async record(examResult: Readonly<ExamResult>): Promise<void>
	{
		this.examResults.push(examResult);
	}

	public popLastRecord(): Readonly<ExamResult>
	{
		return this.examResults.pop() || this.undefinedExamResult;
	}
}