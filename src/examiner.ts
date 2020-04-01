import { emptyExamResult, endStepExaminer, ExamResult, IsochrononFactory, Proof, ProofStep, Registrar, StepExaminer, StepExaminerFactory } from "./";

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
		const stepExaminerChain = this.getStepExaminerChain(proof, examResult);
		await stepExaminerChain.probe(this.isochrononFactory.createIsochronon());
		return examResult;
	}

	private getStepExaminerChain(proof: Readonly<Proof>, examResult: ExamResult): StepExaminer
	{
		const assertExaminer = this.createStepExaminer(ProofStep.assert, proof, examResult);
		const actExaminer = this.createStepExaminer(ProofStep.act, proof, examResult, assertExaminer);
		return this.createStepExaminer(ProofStep.arrange, proof, examResult, actExaminer);
	}

	private createStepExaminer(proofStep: Readonly<ProofStep>, proof: Readonly<Proof>, examResult: ExamResult, nextExaminer: Readonly<StepExaminer> = endStepExaminer): StepExaminer
	{
		return this.stepExaminerFactory.create(proofStep, proof[proofStep], examResult, nextExaminer);
	}
}