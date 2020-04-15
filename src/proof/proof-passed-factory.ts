import { ExaminationResultSet } from "../step-examination";
import { ProofStep } from "./";

export const proofPassedFactory = (examinationResultSet: ExaminationResultSet): boolean =>
{
	return examinationResultSet[ProofStep.arrange].result.passed
		&& examinationResultSet[ProofStep.act].result.passed
		&& examinationResultSet[ProofStep.assert].result.passed
		&& examinationResultSet[ProofStep.annul].result.passed;
};