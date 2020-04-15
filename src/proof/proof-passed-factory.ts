import { ExaminationOutcome, ExaminationResultSet } from "../examination";
import { ProofStep } from "./";

export const proofPassedFactory = (examinationResultSet: ExaminationResultSet): boolean =>
{
	return examinationResultSet[ProofStep.arrange].result.examinationOutcome == ExaminationOutcome.Passed
		&& examinationResultSet[ProofStep.act].result.examinationOutcome == ExaminationOutcome.Passed
		&& examinationResultSet[ProofStep.assert].result.examinationOutcome == ExaminationOutcome.Passed
		&& examinationResultSet[ProofStep.annul].result.examinationOutcome == ExaminationOutcome.Passed;
};