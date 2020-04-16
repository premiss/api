import { ExaminationError, ExaminationResultSet } from "../examination";
import { ProofStep } from "./";

export const proofExaminationErrorFactory = (examinationResultSet: ExaminationResultSet): ExaminationError | undefined =>
{
	return examinationResultSet[ProofStep.arrange].result.examinationError
		|| examinationResultSet[ProofStep.act].result.examinationError
		|| examinationResultSet[ProofStep.assert].result.examinationError
		|| examinationResultSet[ProofStep.annul].result.examinationError;
};