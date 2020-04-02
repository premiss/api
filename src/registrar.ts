import { ExamResult } from "./";

export interface Registrar
{
	readonly record: (examResult: ExamResult) => Promise<void>;
}