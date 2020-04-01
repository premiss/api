import { endStepExaminer, StepExaminer, StepExecutionResult, StepResult, Subject } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResult): Promise<StepExecutionResult>
	{
		const executionResult = await this.execute();
		return executionResult.nextStepExaminer.probe({ ...stepExecutionResult, [this.subject.proofStep]: executionResult.stepResult });

	}

	private async execute(): Promise<Readonly<{ stepResult: StepResult; nextStepExaminer: Readonly<StepExaminer>; }>>
	{
		try
		{
			await this.subject.proofStepSignature();
			return { stepResult: { passed: true, stepExecutionError: undefined }, nextStepExaminer: this.nextStepExaminer };
		}
		catch (error)
		{
			return { stepResult: { passed: false, stepExecutionError: { error, proofStep: this.subject.proofStep } }, nextStepExaminer: endStepExaminer };
		}
	}
}