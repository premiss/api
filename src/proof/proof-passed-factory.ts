import { StepExaminationResultSet } from "../step-examination";
import { ProofStep } from "./";

export const proofPassedFactory = (stepExaminationResultSet: StepExaminationResultSet): boolean =>
{
	return stepExaminationResultSet[ProofStep.arrange].result.passed
		&& stepExaminationResultSet[ProofStep.act].result.passed
		&& stepExaminationResultSet[ProofStep.assert].result.passed
		&& stepExaminationResultSet[ProofStep.annul].result.passed;
};