import { StepExaminer, StepExecutionResult, StepExecutionResultSet, Subject } from "../";

const skippedStepExecutionResult: StepExecutionResult = {
	passed: true,
	elapsedNanoseconds: BigInt(0),
	stepExecutionError: undefined
};

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