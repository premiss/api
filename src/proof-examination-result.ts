import { ExaminationResult } from "./";
import { StepExaminationResultSet } from "./examination/step-examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly stepExaminationResultSet: StepExaminationResultSet;
}