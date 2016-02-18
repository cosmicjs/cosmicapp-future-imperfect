// Home page
import Cosmic from 'cosmicjs'
import moment from 'moment'
module.exports = (app, config, partials) => {
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
}