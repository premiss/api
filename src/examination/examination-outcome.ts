export const enum ExaminationOutcomeObserved
{
	failed = "failed",
	passed = "passed"
}

export const enum ExaminationOutcomeUnobserved
{
	unknown = 'unknown',
	skipped ='skipped'
}

export type ExaminationOutcome = ExaminationOutcomeObserved | ExaminationOutcomeUnobserved;