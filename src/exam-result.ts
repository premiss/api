import { ExaminationError } from "./";
import { StepExecutionResultSet } from "./examination/step-examination";

export interface ExamResult
{
	readonly passed: boolean;
	readonly examinationError: ExaminationError | undefined;
	readonly stepExecutionResultSet: StepExecutionResultSet;
}