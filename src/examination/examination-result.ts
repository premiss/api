import { ExaminationError } from "../index";

export interface ExaminationResult
{
	readonly passed: boolean;
	readonly examinationError: Readonly<ExaminationError | undefined>;
}