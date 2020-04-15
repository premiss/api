import { ExaminationResult } from "../examination";
import { ExaminationResultSet } from "../step-examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly stepExaminationResultSet: ExaminationResultSet;
}