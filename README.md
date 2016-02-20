#Future Imperfect
###Node.js Blog Website
#####[View a demo here](http://future-imperfect.cosmicapp.co/)
[Sign up for Cosmic JS](https://cosmicjs.com/) to start managing content for your websites and applications faster and easier.
The frontend is from [html5up.net](html5up.net) and is made dynamic with mustache `{{ }}` braces with content from the [Cosmic JS Client for JavaScript](https://www.npmjs.com/package/cosmicjs).
####Get Started
In ```app-server.js``` set your bucket slug:
```
const config = {
  COSMIC_BUCKET: process.env.COSMIC_BUCKET || 'future-imperfect'
}
```
Then install:
```
npm install
```
Then run 
```
npm start
```
Go to [http://localhost:3000](http://localhost:3000) in your browser of choice.
