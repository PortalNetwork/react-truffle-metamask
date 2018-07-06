const logDb = require('../src/lib/orbitDb/logModule');


describe('orbitDb log module test', () => {
	
	it('Store current time into log', async () => {
		await logDb.connect();

		const curDate = new Date();
		const hash = await logDb.add(curDate.toString());
		const val = (await logDb.read(hash)).payload.value;
		
		await logDb.diconnect();
		expect(val).toBe(curDate.toString());
	});
});

