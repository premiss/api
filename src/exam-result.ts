export interface ExamResult
{
	passed: boolean;
	elapsedNanoseconds: bigint;
}

// should there be timing for each step?