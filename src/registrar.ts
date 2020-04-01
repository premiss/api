import { ExamResult } from "./";

export interface Registrar
{
	record: (examResult: ExamResult) => Promise<void>;
}