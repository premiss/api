import { endStepExaminer, Proof, ProofStep, StepExaminer, stepExaminerFactory } from "./";

export class StepExaminerChainFactory
{

	public create(proof: Readonly<Proof>): StepExaminer
	{
		const assertExaminer = StepExaminerChainFactory.createStepExaminer(ProofStep.assert, proof);
		const actExaminer = StepExaminerChainFactory.createStepExaminer(ProofStep.act, proof, assertExaminer);
		return StepExaminerChainFactory.createStepExaminer(ProofStep.arrange, proof, actExaminer);
	}

	private static createStepExaminer(proofStep: Readonly<ProofStep>, proof: Readonly<Proof>, nextExaminer: Readonly<StepExaminer> = endStepExaminer): StepExaminer
	{
		return stepExaminerFactory(proofStep, proof[proofStep], nextExaminer);
	}
}