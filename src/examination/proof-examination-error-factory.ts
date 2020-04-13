import { ProofStep } from "../proof-step";
import { StepExaminationResultSet } from "../step-examination";
import { ExaminationError } from "./examination-error";

export const proofExaminationErrorFactory = (stepExecutionResultSet: StepExaminationResultSet): ExaminationError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].result.examinationError
		|| stepExecutionResultSet[ProofStep.act].result.examinationError
		|| stepExecutionResultSet[ProofStep.assert].result.examinationError
		|| stepExecutionResultSet[ProofStep.annul].result.examinationError;
};