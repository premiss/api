import { emptyExamResult, endStepExaminer, ExamResult, IsochrononFactory, Proof, ProofStep, Registrar, StepExaminerFactory } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExaminerFactory: Readonly<StepExaminerFactory>)
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
		const assertExaminer = this.stepExaminerFactory.create(ProofStep.assert, proof.assert, examResult, endStepExaminer);
		const actExaminer = this.stepExaminerFactory.create(ProofStep.act, proof.act, examResult, assertExaminer);
		const arrangeExaminer = this.stepExaminerFactory.create(ProofStep.arrange, proof.arrange, examResult, actExaminer);
		await arrangeExaminer.probe(this.isochrononFactory.createIsochronon());
		return examResult;
	}
}