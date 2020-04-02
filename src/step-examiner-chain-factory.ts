import { endStepExaminer, Proof, ProofStep, StepExaminer, stepExaminerFactory } from "./";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = stepExaminerFactory(ProofStep.assert, proof[(ProofStep.assert)], endStepExaminer);
	const actExaminer = stepExaminerFactory(ProofStep.act, proof[(ProofStep.act)], assertExaminer);
	return stepExaminerFactory(ProofStep.arrange, proof[(ProofStep.arrange)], actExaminer);
};