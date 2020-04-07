import { ExaminationResult, TimedResult } from "../../index";
import { ProofStep } from "../../proof-step";
import { StepExaminer, StepExaminationResultSet } from "./.";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: true, examinationError: undefined }
	};

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly proofStep: ProofStep, private readonly nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		return await this.nextStepExaminer.probe({ ...stepExaminationResultSet, [this.proofStep]: skippedExaminationResult });
	}
}