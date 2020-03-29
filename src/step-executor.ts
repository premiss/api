import { ExamResult, Isochronon, ProofStepSignature, StepExaminer, StepResult } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly proofStepSignature: ProofStepSignature, private readonly examResult: ExamResult, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(isochronon: Readonly<Isochronon>): Promise<void>
	{
		const stepResult = await this.execute();
		this.examResult.elapsedNanoseconds = isochronon.getElapsedNanoseconds();
		this.examResult.passed = stepResult.passed;
		this.examResult.error = stepResult.error;

		if (stepResult.passed)
		{
			await this.nextStepExaminer.probe(isochronon);
		}
	}

	private async execute(): Promise<Readonly<StepResult>>
	{
		try
		{
			await this.proofStepSignature();
			return { passed: true, error: undefined };
		}
		catch (error)
		{
			return { passed: false, error: error };
		}
	}
}