import { ExaminationError } from "./";
import { ExaminationOutcome } from "./examination-outcome";

export interface ExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome;
	readonly passed: boolean;
	readonly examinationError: Readonly<ExaminationError | undefined>;
}