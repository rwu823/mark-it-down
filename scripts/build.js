import webpack from 'webpack'
import webpackConf from '../webpack.config'
import del from 'del'
import pkg from '../package.json'
import fs from 'fs'
import gu from 'gulp'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import size from 'gulp-size'

del.sync('npm')
webpack(webpackConf, (err, stats)=> {
  console.log(stats.toString({
    colors: true,
    progress: true,
  }))

  const {jest, devDependencies, scripts, ...packageJSON} = pkg

  fs.createReadStream('README.md')
    .pipe(fs.createWriteStream('npm/README.md'))
  fs.writeFile('npm/package.json', JSON.stringify(packageJSON, null, 2), (err)=> {
    gu.src('npm/dist/*.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gu.dest('npm/dist'))
      .on('finish', ()=> {
        gu.src('npm/dist/*.js')
          .pipe(size({
            showFiles: true,
            gzip: true,
          }))
      })
  })

})

