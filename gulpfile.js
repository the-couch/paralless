// imports

const json     = require('./package.json'),
      sync     = require('browser-sync'),
      del      = require('del'),
      fs       = require('fs'),
      gulp     = require('gulp'),
      mkdirp   = require('mkdirp'),
      notifier = require('node-notifier'),
      rollup   = require('rollup'),
      babel    = require('rollup-plugin-babel'),
      commonjs = require('rollup-plugin-commonjs'),
      resolve  = require('rollup-plugin-node-resolve'),
      uglify   = require('rollup-plugin-uglify');

// error handler

const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
  this.emit('end')
}

// clean

gulp.task('clean', () => del('dist/**/*.js', 'dist/**/*.map'))

// attribution

const attribution =
`/*!
 * Lazy-Class.js ${ json.version } - ${ json.description }
 * Copyright (c) ${ new Date().getFullYear() } ${ json.author } - ${ json.homepage }
 * License: ${ json.license }
 */
`

// js

const read = {
  entry: 'src/paralless.js',
  sourceMap: true,
  plugins: [
    resolve({ jsnext: true }),
    babel(),
    uglify()
  ]
}

const write = {
  format: 'umd',
  moduleName: 'Paralless',
  sourceMap: true
}

gulp.task('js', () => {
  return rollup
    .rollup(read)
    .then(bundle => {
      // generate the bundle
      const files = bundle.generate(write)

      // cache path to JS dist file
      const dist = 'dist/paralless.min.js'

      // write the JS and sourcemap
      fs.appendFileSync(dist, files.code)
      fs.writeFileSync('dist/maps/paralless.js.map', files.map.toString())
    })
})

// server

const server = sync.create(),
      reload = sync.reload

const sendMaps = (req, res, next) => {
  const filename = req.url.split('/').pop()
  const extension = filename.split('.').pop()

  if(extension === 'css' || extension === 'js') {
    res.setHeader('X-SourceMap', '/maps/' + filename + '.map')
  }

  return next()
}

const options = {
  notify: false,
  server: {
    baseDir: 'dist',
    middleware: [
      sendMaps
    ]
  },
  watchOptions: {
    ignored: '*.map'
  }
}

gulp.task('server', () => sync(options))

// watch

gulp.task('watch', () => {
  gulp.watch('src/paralless.js', ['js', reload])
})

// build and default tasks

gulp.task('build', ['clean'], () => {

  // create dist directories, if needed
  mkdirp.sync('dist')
  mkdirp.sync('dist/maps')

  // run the tasks
  gulp.start('js')
})

gulp.task('default', ['build', 'server', 'watch'])
