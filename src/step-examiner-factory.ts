import { ExamResult, ProofStep, ProofStepSignature, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

export class StepExaminerFactory
{
	public create(proofStep: Readonly<ProofStep>, proofStepSignature: ProofStepSignature | undefined, examResult: ExamResult, nextStepExaminer: Readonly<StepExaminer>): Readonly<StepExaminer>
	{
		return proofStepSignature
			? new StepExecutor({ proofStep, proofStepSignature }, examResult, nextStepExaminer)
			: new SkipStepExaminer(nextStepExaminer);
	}
}