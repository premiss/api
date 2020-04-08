import { ExaminationResult } from "./examination/examination-result";
import { StepExaminationResultSet } from "./examination/step-examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly stepExaminationResultSet: StepExaminationResultSet;
}