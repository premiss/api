import { ExamResult } from "./";

export interface StepExaminer
{
	probe: (examResult: Readonly<ExamResult>) => Promise<Readonly<ExamResult>>;
}