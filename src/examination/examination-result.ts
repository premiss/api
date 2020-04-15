import { ExaminationError } from "./";
import { ExaminationOutcome } from "./examination-outcome";

export interface UnknownExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Unknown;
	readonly examinationError: undefined;
}

export interface SkippedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Skipped;
	readonly examinationError: undefined;
}

export interface ErredExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Failed;
	readonly examinationError: Readonly<ExaminationError>;
}

export interface PassedExaminationResult
{
	readonly examinationOutcome: ExaminationOutcome.Passed;
	readonly examinationError: undefined;
}

export type ExaminationResult = UnknownExaminationResult | SkippedExaminationResult | ErredExaminationResult | PassedExaminationResult;