import { ExamResult } from "./exam-result";

export interface Registrar
{
	record: (examResult: Readonly<ExamResult>) => Promise<void>;
}