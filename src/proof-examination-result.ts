import { ExaminationResult } from "./examination/examination-result";
import { StepExaminationResultSet } from "./step-examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly stepExaminationResultSet: StepExaminationResultSet;
}