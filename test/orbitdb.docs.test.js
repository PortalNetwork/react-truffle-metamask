const docDb = require('../src/lib/orbitDb/docsModule');

describe('orbitDb document based DB module test', () => {
	it('Store document into DB', async () => {
		await docDb.connect();

		const insertDoc = { _id: 'QmAwesomeIpfsHash', name: 'shamb0t', followers: 500 };
		const hash = await docDb.add(insertDoc);
		console.log(hash);
		let val = await docDb.read('QmAwesomeIpfsHash');
		const all = await docDb.query((doc) => doc._id === 'QmAwesomeIpfsHash');
		console.log('all:', all);
		await docDb.diconnect();

		expect(val).toEqual(insertDoc);
		expect(all[0]).toEqual(insertDoc);

		await docDb.delete('QmAwesomeIpfsHash');
		val = await docDb.read('QmAwesomeIpfsHash');
		expect(val).toEqual(undefined);
	});
	
});

