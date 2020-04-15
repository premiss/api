import { ExaminationOutcome, ExaminationResultSet } from "../examination";
import { ProofStep } from "./";

const examinationSuccess = (examinationOutcome: ExaminationOutcome): boolean =>
{
	return examinationOutcome == ExaminationOutcome.Passed || examinationOutcome == ExaminationOutcome.Skipped;
};

const proofSuccess = (examinationResultSet: ExaminationResultSet): boolean =>
{
	return examinationSuccess(examinationResultSet[ProofStep.arrange].result.examinationOutcome)
		&& examinationSuccess(examinationResultSet[ProofStep.act].result.examinationOutcome)
		&& examinationSuccess(examinationResultSet[ProofStep.assert].result.examinationOutcome)
		&& examinationSuccess(examinationResultSet[ProofStep.annul].result.examinationOutcome);
};

export const proofOutcomeFactory = (examinationResultSet: ExaminationResultSet): ExaminationOutcome =>
{
	return proofSuccess(examinationResultSet) ? ExaminationOutcome.Passed : ExaminationOutcome.Failed;
};