import { TimedResult } from "../../timing";
import { ExaminationResult } from "../examination-result";
import { Examine } from "../examine";

export interface StepExaminationResult
{
	readonly examinationResult: TimedResult<ExaminationResult>;
	readonly nextStepExamine: Examine;
}