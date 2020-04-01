import { endStepExaminer, ExamResult, Proof, ProofStep, StepExaminer, StepExaminerFactory } from "./";

export class StepExaminerChainFactory
{
	constructor(private readonly stepExaminerFactory: Readonly<StepExaminerFactory>)
	{
	}

	public create(proof: Readonly<Proof>, examResult: ExamResult): StepExaminer
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