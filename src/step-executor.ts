import { endStepExaminer, ExamResult, Isochronon, StepExaminer, StepResult, Subject } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private readonly examResult: ExamResult, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(isochronon: Readonly<Isochronon>): Promise<void>
	{
		const stepExecutionResult = await this.execute();
		this.examResult.elapsedNanoseconds = isochronon.getElapsedNanoseconds();
		this.examResult.passed = stepExecutionResult.stepResult.passed;
		this.examResult.stepExecutionError = stepExecutionResult.stepResult.stepExecutionError;
		await stepExecutionResult.nextStepExaminer.probe(isochronon);
	}

	private async execute(): Promise<Readonly<{stepResult: StepResult; nextStepExaminer: Readonly<StepExaminer>}>>
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