import { ExaminationResult, Examine } from "../examination";
import { TimedResult } from "../timing";

export interface StepExaminationResult
{
	readonly examinationResult: TimedResult<ExaminationResult>;
	readonly nextStepExamine: Examine;
}