import { skippedStepResult, StepExaminer, StepExecutionResult, Subject } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResult): Promise<StepExecutionResult>
	{
		return await this.nextStepExaminer.probe({ ...stepExecutionResult, [this.subject.proofStep]: skippedStepResult });
	}
}