import { ExamResult, StepExaminer } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(examResult: Readonly<ExamResult>): Promise<Readonly<ExamResult>>
	{
		return await this.nextStepExaminer.probe(examResult);
	}
}