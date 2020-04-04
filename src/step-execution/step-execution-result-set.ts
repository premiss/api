import { ProofStep } from "../";
import { StepExecutionResult } from "./";

export interface StepExecutionResultSet
{
	readonly [ProofStep.arrange]: StepExecutionResult;
	readonly [ProofStep.act]: StepExecutionResult;
	readonly [ProofStep.assert]: StepExecutionResult;
	readonly [ProofStep.annul]: StepExecutionResult;
}