import redis from 'redis'

const client = redis.createClient()

client.on('error', err => console.log('error', err))

export default client
