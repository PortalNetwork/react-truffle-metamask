import OrbitDB from 'orbit-db';
import IpfsApi from 'ipfs-api';

const ipfs = IpfsApi(process.env.IPFS_DAEMON_API_SERVER, process.env.IPFS_CONNECTION_PORT);
let db;

module.exports.connect = async () => {
	if(!db){
		const orbitdb = new OrbitDB(ipfs);
		db = await orbitdb.docs('docSample')
	}else{
		return db;
	}
	
};

module.exports.add = async (doc) => {
	try {
		if(!doc) {
			return {message: 'invalid input'};
		}
		if(!db) {
			return {message: 'CONNECTION FAILED'}
		}
		const hash = await db.put(doc)
		await db.close();
		return hash;
	} catch (err) {
		throw err;
	}	
};

module.exports.read = async (id) => {
	try {
		if (!id) {
			return {message: 'invalid id'}
		}
		if(!db) {
			return {message: 'CONNECTION FAILED'}
		}
		await db.load();
		const doc = db.get(id)
		await db.close();
		console.log(doc);
		return doc[0];
	} catch (err) {
		throw err;
	}	
};

module.exports.query = async (mapper) => {
	try {
		await db.load();
		const all = await db.query(mapper)
		await db.close();
		console.log(all);
		return all;
	} catch (err) {
		throw err;
	}	
};

module.exports.delete = async (id) => {
	try {
		if (!id) {
			return {message: 'invalid id'}
		}
		await db.load();
		const hash = await db.del(id)
		await db.close();

		return hash;
	} catch (err) {
		throw err;
	}	
};
module.exports.diconnect = async () => {
	try {
		
		await ipfs.stop();
	} catch (err) {
		throw err;
	}	
};