// app-server.js
import express from 'express'
import hogan from 'hogan-express'
import http_module from 'http'
import compression from 'compression'
import moment from 'moment'
import Cosmic from 'cosmicjs'
const config = {
  COSMIC_BUCKET: process.env.COSMIC_BUCKET || 'future-imperfect'
}
const app = express()
app.use(compression())
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
app.get('/', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
    res.locals.cosmic = response
    // Friendly dates
    const posts = response.objects.type.posts
    const friendly_date_posts = posts.map(post => {
      const created_friendly = moment(post.created).format('MMMM Do, YYYY')
      post.created_friendly = created_friendly
      return post
    })
    res.locals.cosmic.objects.type.posts = friendly_date_posts
    return res.render('index.html', {
      partials
    })
  })
})
app.get('/:slug', (req, res) => {
  if (req.url === '/favicon.ico')
    return res.end()
  Cosmic.getObject({ bucket: { slug: 'future-imperfect' } }, { slug: req.params.slug }, (err, response) => {
    res.locals.cosmic = response
    return res.render('index.html', {
      partials
    })
  })
})
const http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.log('Future Imperfect listening on port ' + app.get('port'))
})