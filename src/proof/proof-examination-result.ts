import { ExaminationError, ExaminationOutcome, ExaminationResultSet } from "../examination";

export interface ErredProofExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Failed;
	readonly examinationError: Readonly<ExaminationError>;
	readonly examinationResultSet: ExaminationResultSet;
}

export interface PassedProofExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Passed;
	readonly examinationError: undefined;
	readonly examinationResultSet: ExaminationResultSet;
}

export type ProofExaminationResult = ErredProofExaminationResult | PassedProofExaminationResult;

