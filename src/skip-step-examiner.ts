import { skippedStepExecutionResult, StepExaminer, StepExecutionResultSet, Subject } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly subject: Subject, private readonly nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		return await this.nextStepExaminer.probe({ ...stepExecutionResultSet, [this.subject.proofStep]: skippedStepExecutionResult });
	}
}