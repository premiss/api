import { endStepExaminer, ExamResult, StepExaminer, StepResult, Subject } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(examResult: Readonly<ExamResult>): Promise<Readonly<ExamResult>>
	{
		const stepExecutionResult = await this.execute();
		return await stepExecutionResult.nextStepExaminer.probe({...examResult, passed: stepExecutionResult.stepResult.passed, stepExecutionError: stepExecutionResult.stepResult.stepExecutionError});
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