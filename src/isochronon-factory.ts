import { Isochronon } from "./isochronon";

export class IsochrononFactory
{
	public createIsochronon(): Readonly<Isochronon>
	{
		return new Isochronon();
	}
}