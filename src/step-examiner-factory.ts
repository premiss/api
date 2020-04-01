import { ProofStep, ProofStepSignature, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

export const stepExaminerFactory = (proofStep: Readonly<ProofStep>, proofStepSignature: ProofStepSignature | undefined, nextStepExaminer: Readonly<StepExaminer>): Readonly<StepExaminer> =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExaminer)
		: new SkipStepExaminer(nextStepExaminer);
};