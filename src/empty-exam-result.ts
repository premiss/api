import { ExamResult } from "./";

export const emptyExamResult: Readonly<ExamResult> =
	{
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined,
		passed: false
	};