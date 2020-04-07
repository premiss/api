import { ExaminationResult, TimedResult } from "../../index";
import { ProofStep } from "../../proof-step";
import { Examine } from "../examine";
import { StepExaminer, StepExaminationResultSet } from "./.";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: true, examinationError: undefined }
	};

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly proofStep: ProofStep, private readonly nextStepExamine: Examine)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		return await this.nextStepExamine({ ...stepExaminationResultSet, [this.proofStep]: skippedExaminationResult });
	}
}