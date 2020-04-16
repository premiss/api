import { ExaminationError, ExaminationOutcomeObserved, ExaminationOutcomeUnobserved } from "./";

export interface UnknownExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeUnobserved.Unknown;
	readonly examinationError: undefined;
}

export interface SkippedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeUnobserved.Skipped;
	readonly examinationError: undefined;
}

export interface ErredExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeObserved.Failed;
	readonly examinationError: Readonly<ExaminationError>;
}

export interface PassedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcomeObserved.Passed;
	readonly examinationError: undefined;
}

export type ExaminationResult = UnknownExaminationResult | SkippedExaminationResult | ErredExaminationResult | PassedExaminationResult;