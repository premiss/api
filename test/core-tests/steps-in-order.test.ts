import { strict as assert } from "assert";
import { verify } from "../../src";
import { Proof, ProofStep } from "../../src/proof";
import { passedAssert, timingAssert } from "../common-asserts";

const proof = new class implements Proof
{
	private readonly stepExaminationObservers: Array<(proofStep: ProofStep) => void> = [];

	public attachStepExaminationObserver(stepExecutionObserver: (proofStep: ProofStep) => void): void
	{
		this.stepExaminationObservers.push(stepExecutionObserver);
	}

	private notify(proofStep: ProofStep): void
	{
		this.stepExaminationObservers.forEach(observer => observer(proofStep));
	}

	public async [ProofStep.arrange](): Promise<void>
	{
		this.notify(ProofStep.arrange);
	}

	public async [ProofStep.act](): Promise<void>
	{
		this.notify(ProofStep.act);
	}

	public async [ProofStep.assert](): Promise<void>
	{
		this.notify(ProofStep.assert);
	}

	public async [ProofStep.annul](): Promise<void>
	{
		this.notify(ProofStep.annul);
	}
};

const expectedStepExaminationOrder = [ProofStep.arrange, ProofStep.act, ProofStep.assert, ProofStep.annul];

export const stepsInOrderTest = async function stepsInOrderTest(): Promise<void>
{
	const actualStepExaminationOrder: ProofStep[] = [];
	proof.attachStepExaminationObserver((proofStep => actualStepExaminationOrder.push(proofStep)));
	const examResult = await verify(proof);
	passedAssert(examResult);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.arrange]);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.act]);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.assert]);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.annul]);
	timingAssert(examResult);
	assert.equal(actualStepExaminationOrder.length, expectedStepExaminationOrder.length, "The observed step examinations should be same count as the expected");
	expectedStepExaminationOrder.forEach((expectedStep: ProofStep, index: number) => assert.equal(expectedStep, actualStepExaminationOrder[index], `The next expected step was ${expectedStep}, but found the executed step was ${actualStepExaminationOrder[index]}`));
};