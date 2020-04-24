import { ExaminationError, ExaminationOutcomeObserved, ExaminationOutcomeUnobserved } from "./";

export interface UnknownExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeUnobserved.unknown;
	readonly examinationError: undefined;
}

export interface SkippedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeUnobserved.skipped;
	readonly examinationError: undefined;
}

export interface ErredExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeObserved.failed;
	readonly examinationError: Readonly<ExaminationError>;
}

export interface PassedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeObserved.passed;
	readonly examinationError: undefined;
}

export type ExaminationResult = UnknownExaminationResult | SkippedExaminationResult | ErredExaminationResult | PassedExaminationResult;