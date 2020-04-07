import { ProofStep, ExecutionResult, TimedResult } from "../../index";

export interface StepExecutionResultSet
{
	readonly [ProofStep.arrange]: TimedResult<ExecutionResult>;
	readonly [ProofStep.act]:  TimedResult<ExecutionResult>;
	readonly [ProofStep.assert]:  TimedResult<ExecutionResult>;
	readonly [ProofStep.annul]:  TimedResult<ExecutionResult>;
}