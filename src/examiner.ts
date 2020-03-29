import { emptyExamResult, endStepExaminer, ExamResult, IsochrononFactory, Proof, ProofStepSignature, Registrar, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const examResult = await this.executeSteps(proof);
		await this.registrar.record(examResult);
	}

	private async executeSteps(proof: Readonly<Proof>): Promise<Readonly<ExamResult>>
	{
		const examResult: ExamResult = { ...emptyExamResult };
		const assertExecute = Examiner.createStepExecution(proof.assert, examResult, endStepExaminer);
		const actExecute = Examiner.createStepExecution(proof.act, examResult, assertExecute);
		const arrangeExecute = Examiner.createStepExecution(proof.arrange, examResult, actExecute);
		await arrangeExecute.probe(this.isochrononFactory.createIsochronon());
		return examResult;
	}

	private static createStepExecution(proofStepSignature: ProofStepSignature | undefined, examResult: ExamResult, next: StepExaminer): StepExaminer
	{
		if (proofStepSignature)
		{
			return new StepExecutor(proofStepSignature, examResult, next);
		}

		return new SkipStepExaminer(next);
	}
}

