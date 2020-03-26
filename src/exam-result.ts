export interface ExamResult
{
	passed: boolean;
	elapsedNanoseconds: bigint;
	error: Error | undefined;
}

// should there be timing for each step?