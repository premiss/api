import { endStepExaminer, Proof, ProofStep, StepExaminer, stepExaminerFactory } from "./";

const createStepExaminer = (proofStep: ProofStep, proof: Proof, nextExaminer: StepExaminer = endStepExaminer): StepExaminer =>
{
	return stepExaminerFactory(proofStep, proof[proofStep], nextExaminer);
};

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = createStepExaminer(ProofStep.assert, proof);
	const actExaminer = createStepExaminer(ProofStep.act, proof, assertExaminer);
	return createStepExaminer(ProofStep.arrange, proof, actExaminer);
};