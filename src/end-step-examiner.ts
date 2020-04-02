import { StepExaminer, StepExecutionResultSet } from "./";

export const endStepExaminer: StepExaminer =
	{
		probe: async (stepExecutionResult: StepExecutionResultSet): Promise<StepExecutionResultSet> =>
		{
			return stepExecutionResult;
		}
	};