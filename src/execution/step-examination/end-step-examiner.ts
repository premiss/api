import { StepExaminer, StepExecutionResultSet } from "./index";

export const endStepExaminer: StepExaminer =
	{
		probe: async (stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet> =>
		{
			return stepExecutionResultSet;
		}
	};