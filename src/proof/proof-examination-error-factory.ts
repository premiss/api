import { ExaminationError, ExaminationResultSet } from "../examination";
import { ProofStep } from "./";

export const proofExaminationErrorFactory = (stepExecutionResultSet: ExaminationResultSet): ExaminationError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].result.examinationError
		|| stepExecutionResultSet[ProofStep.act].result.examinationError
		|| stepExecutionResultSet[ProofStep.assert].result.examinationError
		|| stepExecutionResultSet[ProofStep.annul].result.examinationError;
};