const Records = require('spike-records')
const Collections = require('spike-collections')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const locals = {}
const collections = new Collections({ 
  addDataTo: locals, 
  collections: {
    posts: { files: 'pages/**' }
  }
})

module.exports = {
  devtool: 'source-map',
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({
    locals: () => locals
  }),
  postcss: cssStandards(),
  babel: jsStandards(),
  plugins: [new Records({
    addDataTo: locals,
    artists: { 
      url: 'http://165.227.42.179:8080/api/1.1/tables/artist/rows?access_token=92g3J2AynDXvoMkkUzVkCs9CeCXLPhrt',
      transform: (response) => { return response.data },
      template: {
        path: 'views/artist.html',
        output: (artist) => { return `artists/${artist.name}.html` }
      }
    },
    labels: { 
      url: 'http://165.227.42.179:8080/api/1.1/tables/label/rows?access_token=92g3J2AynDXvoMkkUzVkCs9CeCXLPhrt',
      transform: (response) => { return response.data },
      template: {
        path: 'views/label.html',
        output: (label) => { return `labels/${label.slug}.html` }
      }
    }
  })]
}
