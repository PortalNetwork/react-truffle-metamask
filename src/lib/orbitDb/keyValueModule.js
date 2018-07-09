import OrbitDB from 'orbit-db';
import IpfsApi from 'ipfs-api';

const ipfs = IpfsApi(process.env.IPFS_DAEMON_API_SERVER, process.env.IPFS_CONNECTION_PORT);
let db;

module.exports.connect = async () => {
	if(!db){
		const orbitdb = new OrbitDB(ipfs);
		db = await orbitdb.keyvalue('keyValSample');
	}else{
		return db;
	}
};


module.exports.add = async (key, value) => {
	try {
		if (!key.length) {
			return {message: 'invalid input'}
		}
		await db.put(key, value)
		await db.close();
		return {message: 'success'};
	} catch (err) {
		throw err;
	}	
}

module.exports.read = async (key) => {
	try {
		if (!key.length) {
			return {message: 'invalid key'}
		}
		await db.load();
		const value = await db.get(key);
		return value;
	} catch (err) {
		throw err;
	}	
}

module.exports.diconnect = async () => {
	try {
		await ipfs.stop();
	} catch (err) {
		throw err;
	}	
};