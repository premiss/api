import { StepExecutionError } from "./";

export interface ExamResult
{
	passed: boolean;
	elapsedNanoseconds: bigint;
	stepExecutionError: Readonly<StepExecutionError | undefined>;
}

// should there be timing for each step?