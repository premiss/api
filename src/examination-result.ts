import { ExaminationError } from "./";

export interface ExaminationResult
{
	readonly passed: boolean;
	readonly examinationError: Readonly<ExaminationError | undefined>;
}