import { endStepExaminer, Proof, ProofStep, StepExaminer, StepExaminerFactory } from "./";

export class StepExaminerChainFactory
{
	constructor(private readonly stepExaminerFactory: Readonly<StepExaminerFactory>)
	{
	}

	public create(proof: Readonly<Proof>): StepExaminer
	{
		const assertExaminer = this.createStepExaminer(ProofStep.assert, proof);
		const actExaminer = this.createStepExaminer(ProofStep.act, proof, assertExaminer);
		return this.createStepExaminer(ProofStep.arrange, proof, actExaminer);
	}

	private createStepExaminer(proofStep: Readonly<ProofStep>, proof: Readonly<Proof>, nextExaminer: Readonly<StepExaminer> = endStepExaminer): StepExaminer
	{
		return this.stepExaminerFactory.create(proofStep, proof[proofStep], nextExaminer);
	}
}