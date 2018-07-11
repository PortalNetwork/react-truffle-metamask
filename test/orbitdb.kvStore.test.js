const orbitKeyValueDb = require('../src/lib/orbitDb/keyValueModule');


describe('orbitDb keyValue module test', () => {
	it('Store key-value pair into db', async () => {
		await orbitKeyValueDb.connect();
		await orbitKeyValueDb.add('shopping list', 
			[
				'potato',
				'tomato',
				'carrot',
				'broccoli'
			]
		);
		let shoppingList = await orbitKeyValueDb.read('shopping list');
		console.log(shoppingList);

		if(shoppingList.indexOf("pepper") === -1){
			await orbitKeyValueDb.add('shopping list', shoppingList.concat("pepper"));
		}
		shoppingList = await orbitKeyValueDb.read('shopping list');
		
		expect(shoppingList).toEqual([
			'potato',
			'tomato',
			'carrot',
			'broccoli',
			'pepper'
		]);
	});
});

