import { Isochronon } from "./";

export interface StepExaminer
{
	probe: (isochronon: Readonly<Isochronon>) => Promise<void>;
}

