import { ExaminationResultSet } from "../step-examination";
import { ProofStep } from "./";

export const proofPassedFactory = (stepExaminationResultSet: ExaminationResultSet): boolean =>
{
	return stepExaminationResultSet[ProofStep.arrange].result.passed
		&& stepExaminationResultSet[ProofStep.act].result.passed
		&& stepExaminationResultSet[ProofStep.assert].result.passed
		&& stepExaminationResultSet[ProofStep.annul].result.passed;
};