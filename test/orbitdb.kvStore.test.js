const keyValueDb = require('../src/lib/orbitDb/keyValueModule');


describe('orbitDb keyValue module test', () => {
	it('Store key-value pair into db', async () => {
		await keyValueDb.connect();

		if(await orbitKeyValueDb.read('shopping list') == undefined){
			await orbitKeyValueDb.add('shopping list', 
				[
					'potato',
					'tomato',
					'carrot',
					'broccoli'
				]
			);
		}
		let shoppingList = await orbitKeyValueDb.read('shopping list');
		if(shoppingList.indexOf("pepper") === -1){
			await orbitKeyValueDb.add('shopping list', shoppingList.concat("pepper"));
		}
		shoppingList = await orbitKeyValueDb.read('shopping list');
		await keyValueDb.diconnect();
		expect(shoppingList).toBe([
			'potato',
			'tomato',
			'carrot',
			'broccoli',
			'pepper'
		]);
	});
});

