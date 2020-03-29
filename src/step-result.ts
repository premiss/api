export interface StepResult
{
	passed: boolean;
	error: Readonly<Error | undefined>;
}