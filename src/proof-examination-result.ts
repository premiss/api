import { ExaminationResult } from "./examination";
import { StepExaminationResultSet } from "./step-examination";

export interface ProofExaminationResult extends ExaminationResult
{
	readonly stepExaminationResultSet: StepExaminationResultSet;
}