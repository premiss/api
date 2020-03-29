export interface ExamResult
{
	passed: boolean;
	elapsedNanoseconds: bigint;
	error: Readonly<Error | undefined>;
}

// should there be timing for each step?