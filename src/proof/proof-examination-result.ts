import { ErredExaminationResult, ExaminationResultSet, PassedExaminationResult } from "../examination";

export interface ErredProofExaminationResult extends ErredExaminationResult
{
	readonly examinationResultSet: ExaminationResultSet;
}

export interface PassedProofExaminationResult extends PassedExaminationResult
{
	readonly examinationResultSet: ExaminationResultSet;
}

export type ProofExaminationResult = ErredProofExaminationResult | PassedProofExaminationResult;

