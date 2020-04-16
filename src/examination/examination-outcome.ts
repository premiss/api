export const enum ExaminationOutcomeObserved
{
	Failed = "Failed",
	Passed = "Passed"
}

export const enum ExaminationOutcomeUnobserved
{
	Unknown = 'Unknown',
	Skipped ='Skipped'
}

export type ExaminationOutcome = ExaminationOutcomeObserved | ExaminationOutcomeUnobserved;