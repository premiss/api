import { SequenceSplit } from "./sequence-split";

type AddAccumulation = { value: number; negatives: number[]; };

export class StringCalculator
{
	private static readonly addValueLimit = 1000;

	constructor(private readonly sequenceSplit: SequenceSplit)
	{
	}

	public add(numbers: string): number
	{
		const splitValues = this.sequenceSplit(numbers);
		const addAccumulation = splitValues.reduce(StringCalculator.sum, { value: 0, negatives: [] });
		StringCalculator.negativeNumberCheck(addAccumulation.negatives);
		return addAccumulation.value;
	}

	private static negativeNumberCheck(negatives: number[]): void
	{
		if (negatives.length)
		{
			throw new Error(`negatives not allowed, found ${negatives.join(", ")}`);
		}
	}

	private static sum(accumulator: AddAccumulation, current: string): AddAccumulation
	{
		const value = +current;
		accumulator.value += value > StringCalculator.addValueLimit ? 0 : value;
		accumulator.negatives = value < 0 ? [...accumulator.negatives, value] : accumulator.negatives;
		return accumulator;
	}
}