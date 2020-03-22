export interface Proof
{
	arrange?: () => Promise<void>;
	act?: () => Promise<void>;
	assert: () => Promise<void>;
}