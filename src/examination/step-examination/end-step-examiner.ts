import { StepExaminer, StepExaminationResultSet } from "./index";

export const endStepExaminer: StepExaminer =
	{
		probe: async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
		{
			return stepExaminationResultSet;
		}
	};