import OrbitDB from 'orbit-db';
import IpfsApi from 'ipfs-api';

const ipfs = IpfsApi(process.env.IPFS_DAEMON_API_SERVER, process.env.IPFS_CONNECTION_PORT);
let db;

module.exports.connect = async () => {
	if(!db){
		const orbitdb = new OrbitDB(ipfs)
		db = await orbitdb.eventlog('logSample');
	}else{
		return db;
	}
};

module.exports.add = async (value) => {
	try {
		if(!value.length) {
			return {message: 'invalid input'};
		}
		if(!db) {
			return {message: 'CONNECTION FAILED'}
		}
		const hash = await db.add(value)
		await db.close();
		return hash;
	} catch (err) {
		throw err;
	}	
};

module.exports.read = async (hash) => {
	try {
		if (!hash.length) {
			return {message: 'invalid hash'}
		}
		if(!db) {
			return {message: 'CONNECTION FAILED'}
		}
		await db.load();
		const log = await db.get(hash);
		await db.close();
		return log;
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