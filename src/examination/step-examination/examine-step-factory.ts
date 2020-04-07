import { ProofStep } from "../../proof-step";
import { ProofStepSignature } from "../../proof-step-signature";
import { Examine } from "../examine";
import { SkipStepExaminer } from "./skip-step-examiner";
import { StepExaminer } from "./step-examiner";
import { StepExecutor } from "./step-executor";

export const examineStepFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): StepExaminer =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExamine)
		: new SkipStepExaminer(proofStep, nextStepExamine);
};