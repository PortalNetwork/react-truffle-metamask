const logDb = require('../src/lib/orbitDb/logModule');


describe('orbitDb log module test', () => {
	
	it('Store current time into log', async () => {
		await logDb.connect();

		const curDate = new Date();
		const hash = await logDb.add(curDate.toString());
		const val = (await logDb.read(hash)).payload.value;
		console.log(val);

		expect(val).toBe(curDate.toString());
	});
});

// const OrbitDB = require('orbit-db');
// const IpfsApi = require('ipfs-api');

// const logTest = async () => {
	
// 	const ipfs = IpfsApi('localhost', '5002');
// 	const orbitdb = new OrbitDB(ipfs)
// 	const db = await orbitdb.log('hello');
// 	//console.log(db);
// 	const hash = await db.add("ooop");
// 	console.log(hash);
// 	console.log(await db.get(hash));
// };

// //keyValueDbTest();
// logTest()