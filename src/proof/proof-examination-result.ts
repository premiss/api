import { ExaminationResult, ExaminationResultSet } from "../examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly examinationResultSet: ExaminationResultSet;
}