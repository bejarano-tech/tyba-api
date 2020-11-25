import app from './app.js'
import http from 'http'

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`)
})