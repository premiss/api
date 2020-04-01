export interface StepExaminer
{
	probe: () => Promise<void>;
}