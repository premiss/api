import { StepExaminer, StepExecutionResultSet } from "./";

export const endStepExaminer: StepExaminer =
	{
		probe: async (stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet> =>
		{
			return stepExecutionResultSet;
		}
	};