import { Isochronon } from "./";

export class IsochrononFactory
{
	public createIsochronon(): Readonly<Isochronon>
	{
		return new Isochronon();
	}
}