import { ProofStep } from "../../proof-step";
import { ProofStepSignature } from "../../proof-step-signature";
import { Examine } from "../examine";
import { SkipStepExaminer } from "./skip-step-examiner";
import { StepExecutor } from "./step-executor";

export const examineStepFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): Examine =>
{
	const stepExaminer =  proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExamine)
		: new SkipStepExaminer(proofStep, nextStepExamine);

	return (stepExecutionResultSet) => stepExaminer.probe(stepExecutionResultSet);
};