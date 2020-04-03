import { endStepExaminer, Proof, ProofStep, ProofStepSignature, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

const stepExaminerFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExaminer: StepExaminer): StepExaminer =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExaminer)
		: new SkipStepExaminer({ proofStep, proofStepSignature: async () => { return; } }, nextStepExaminer);
};

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const annulExaminer = stepExaminerFactory(ProofStep.annul, proof[ProofStep.annul], endStepExaminer);
	const assertExaminer = stepExaminerFactory(ProofStep.assert, proof[ProofStep.assert], annulExaminer);
	const actExaminer = stepExaminerFactory(ProofStep.act, proof[ProofStep.act], assertExaminer);
	return stepExaminerFactory(ProofStep.arrange, proof[ProofStep.arrange], actExaminer);
};