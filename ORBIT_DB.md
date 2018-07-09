# Orbit-db

## Start on your local

### Running js-ipfs with Docker


1. Install docker, follow the instructions [here](https://docs.docker.com/install/)
2. You can run js-ipfs like this: 
```
docker run -it -p 4002:4002 -p 4003:4003 -p 5002:5002 -p 9090:9090 ipfs/js-ipfs:latest
```
```
$ docker run -it -p 4002:4002 -p 4003:4003 -p 5002:5002 -p 9090:9090 ipfs/js-ipfs:latest

initializing ipfs node at /root/.jsipfs
generating 2048-bit RSA keypair...done
peer identity: Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS
to get started, enter:

				jsipfs files cat /ipfs/QmfGBRT6BbWJd7yUc2uYdaUZJBbnEFvTqehPFoSMQ6wgdr/readme

Initializing daemon...
Using wrtc for webrtc support
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS
Swarm listening on /ip4/172.17.0.2/tcp/4003/ws/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS
Swarm listening on /ip4/127.0.0.1/tcp/4002/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS
Swarm listening on /ip4/172.17.0.2/tcp/4002/ipfs/Qmbd5jx8YF1QLhvwfLbCTWXGyZLyEJHrPbtbpRESvYs4FS
API is listening on: /ip4/0.0.0.0/tcp/5002
Gateway (readonly) is listening on: /ip4/0.0.0.0/tcp/9090
Daemon is ready
```
3. Nodes are available on localhost port `5002`

### Environment Settings
1. Set your environment variable. In this example: `localhost` and `5002`
```
export IPFS_DAEMON_API_SERVER=<Your localhost>
export IPFS_CONNECTION_PORT=<Your daemon port>
```

### Connect with ipfs Daemon API server

1. Connect a http client with [js-ipfs API](https://github.com/ipfs/js-ipfs-api#importing-the-module-and-usage)
```javascript
const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi(IPFS_DAEMON_API_SERVER, IPFS_CONNECTION_PORT)
const orbitdb = new OrbitDB(ipfs)
const db = await orbitdb.log('hello')
```

### Orbit-db module

File: [module](./src/lib/orbitDb)
API Document: [here](https://github.com/orbitdb/orbit-db/blob/master/API.md)

Module list:
- log module
	- You can use orbit-db as log storage
- key-value store module
	- You can use orbit-db as key-value pair db.
- docs module
	- Database for storing indexed documents. Stores documents by _id field by default but you can also specify a custom field to index by.
- The other module:
	- You can implement it on your own. Reference to orbit-db github: [here](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbit-db-api-documentation)