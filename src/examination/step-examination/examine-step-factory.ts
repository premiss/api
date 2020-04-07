import { ProofStep } from "../../proof-step";
import { ProofStepSignature } from "../../proof-step-signature";
import { SkipStepExaminer } from "./skip-step-examiner";
import { StepExaminer } from "./step-examiner";
import { StepExecutor } from "./step-executor";

export const examineStepFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExaminer: StepExaminer): StepExaminer =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, (stepExaminationResultSet) => nextStepExaminer.probe(stepExaminationResultSet))
		: new SkipStepExaminer(proofStep, (stepExaminationResultSet) => nextStepExaminer.probe(stepExaminationResultSet));
};