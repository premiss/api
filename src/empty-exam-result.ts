import { ExamResult } from "./";

export const emptyExamResult: Readonly<ExamResult> =
	{
		elapsedNanoseconds: BigInt(0),
		error: undefined,
		passed: false
	};