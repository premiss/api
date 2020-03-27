import { ExamResult } from "./";

export interface Registrar
{
	record: (examResult: Readonly<ExamResult>) => Promise<void>;
}