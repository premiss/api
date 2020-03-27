import { ExamResult, Registrar } from "../src";

export class TestRegistrar implements Registrar
{
	private readonly emptyResult: ExamResult = {} as ExamResult;
	private readonly examResults: ExamResult[] = [];

	public async record(examResult: Readonly<ExamResult>): Promise<void>
	{
		this.examResults.push(examResult);
	}

	public popLastRecord(): ExamResult
	{
		return this.examResults.pop() || this.emptyResult;
	}
}