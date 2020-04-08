import { TimedResult } from "../timing";
import { ExaminationResult } from "../examination/examination-result";
import { Examine } from "../examination/examine";

export interface StepExaminationResult
{
	readonly examinationResult: TimedResult<ExaminationResult>;
	readonly nextStepExamine: Examine;
}