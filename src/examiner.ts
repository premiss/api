import { ExamResult, IsochrononFactory, Proof, ProofStep, ProofStepSignature, Registrar, StepExecutor, StepExecutorFactory, StepResult } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExecutorFactory: StepExecutorFactory)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const steps = [proof[ProofStep.assert], proof[ProofStep.act], proof[ProofStep.arrange]];
		const examResult = await this.iterateSteps(steps);
		await this.registrar.record(examResult);
	}

	private async iterateSteps(proofStepSignatures: ReadonlyArray<ProofStepSignature | undefined>): Promise<ExamResult>
	{
		let examResult: ExamResult = { elapsedNanoseconds: BigInt(0), passed: true, error: undefined };
		let index = proofStepSignatures.length - 1;
		const isochronon = this.isochrononFactory.createIsochronon();

		do
		{
			const stepResult = await this.getStepResult(this.stepExecutorFactory.create(proofStepSignatures[index]));
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...stepResult };
			if (!examResult.passed)
			{
				break;
			}
		} while (index-- > 0);

		return examResult;
	}

	private async getStepResult(stepExecutor: Readonly<StepExecutor>): Promise<StepResult>
	{
		return new Promise<StepResult>(resolve =>
		{
			stepExecutor.executeStep((stepResult: StepResult): void =>
			{
				resolve(stepResult);
			});
		});
	}
}

