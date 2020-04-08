import { ExaminationError } from "./examination-error";

export interface ExaminationResult
{
	readonly passed: boolean;
	readonly examinationError: Readonly<ExaminationError | undefined>;
}