import { ExaminationError } from "./";

export interface ExecutionResult
{
	readonly passed: boolean;
	readonly examinationError: Readonly<ExaminationError | undefined>;
}