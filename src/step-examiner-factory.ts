import { emptyAsyncVoid, ProofStep, ProofStepSignature, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

export const stepExaminerFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExaminer: StepExaminer): StepExaminer =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExaminer)
		: new SkipStepExaminer({ proofStep, proofStepSignature: emptyAsyncVoid }, nextStepExaminer);
};