// load packages
const fs    = require('fs-extra');
const unzip = require('unzip')
const path  = require('path')
const mkdir = require('mkdirp')

// load data from command line
// unzip and read json
var inputZipPath = process.argv.splice(2,1)[0];

console.info('reading zip file...')
fs.createReadStream(inputZipPath)
  .pipe(unzip.Parse())
  .on('entry', function (entry) {

    var fileName  = entry.path;
    var type      = entry.type;
    var extension = path.extname(entry.path);

    console.debug(entry.type, entry.path, extension);

    if (type === 'File' && extension === '.json') {

      var fullPath = __dirname + '/output/' + path.dirname( fileName )
      fileName = path.basename( fileName )
      // mkdir.sync(fullPath)
      // entry.pipe(fs.createWriteStream( fullPath + '/' + fileName ))
      entry.pipe(
        fs.createWriteStream(fileName)
          .on('close', function(data){
              console.log('close stream')
              extractData(fileName);
          })
      )

    } else {
      entry.autodrain()
      // process.exit(0)
    }
  })

function extractData(jsonFile){
  var rawData = fs.readJSONSync(jsonFile);
  console.log('read JSON');
  // TODO call function to extract data based on start & and time (input by argv)
}
