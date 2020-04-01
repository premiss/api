import { ExamResult, StepExaminer } from "./";

export const endStepExaminer: Readonly<StepExaminer> =
	{
		probe: async (examResult: Readonly<ExamResult>): Promise<Readonly<ExamResult>> => { return examResult; }
	};