import { StepExaminer, StepExecutionResult } from "./";

export const endStepExaminer: StepExaminer =
	{
		probe: async (stepExecutionResult: StepExecutionResult): Promise<StepExecutionResult> =>
		{
			return stepExecutionResult;
		}
	};