import { endStepExaminer, Proof, ProofStep, StepExaminer, stepExaminerFactory } from "./";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const annulExaminer = stepExaminerFactory(ProofStep.annul, proof[ProofStep.annul], endStepExaminer);
	const assertExaminer = stepExaminerFactory(ProofStep.assert, proof[ProofStep.assert], annulExaminer);
	const actExaminer = stepExaminerFactory(ProofStep.act, proof[ProofStep.act], assertExaminer);
	return stepExaminerFactory(ProofStep.arrange, proof[ProofStep.arrange], actExaminer);
};