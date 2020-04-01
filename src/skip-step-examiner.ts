import { StepExaminer } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(): Promise<void>
	{
		await this.nextStepExaminer.probe();
	}
}