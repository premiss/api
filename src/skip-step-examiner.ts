import { skippedStepExecutionResult, StepExaminer, StepExecutionResultSet, Subject } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly subject: Subject, private readonly nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		return await this.nextStepExaminer.probe({ ...stepExecutionResult, [this.subject.proofStep]: skippedStepExecutionResult });
	}
}