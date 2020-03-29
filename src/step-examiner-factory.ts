import { ExamResult, ProofStepSignature, SkipStepExaminer, StepExaminer, StepExecutor } from "./";

export class StepExaminerFactory
{
	public create(proofStepSignature: ProofStepSignature | undefined, examResult: ExamResult, nextStepExaminer: Readonly<StepExaminer>): Readonly<StepExaminer>
	{
		return proofStepSignature
			? new StepExecutor(proofStepSignature, examResult, nextStepExaminer)
			: new SkipStepExaminer(nextStepExaminer);
	}
}