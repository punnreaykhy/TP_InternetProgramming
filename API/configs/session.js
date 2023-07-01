var session = require('express-session')
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")

module.exports = async (app) => {
  let redisClient = createClient({url: 'redis://localhost:6379', legacyMode: true})
  redisClient.connect().then(()=>{
    console.log("Redis connected~");
  }).catch(console.error)

  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'my-secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    name: 'access_token',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
      secure: false,
    }
  })
  )
}

