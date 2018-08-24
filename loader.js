// DATA LOADER : load new trip data
const fs    = require('fs-extra');
const unzip = require('unzip')
const path  = require('path')
const mkdir = require('mkdirp')

const db = require('./dbUtils');

function loadTripFromZip(inputZipPath, s, e){
  console.log('reading', inputZipPath, 'starting from ', s, 'to ', e);
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
                extractData(fileName, s, e);
            })
        )

      } else {
        entry.autodrain()
      }
    })
}

function extractData(jsonFile, startDate = new Date(2018,7,1), endDate = new Date(2018,8,1), outFileName){
  // extract data based on start & and time (input by argv)
  console.log('reading JSON');
  var rawData = fs.readJSONSync(jsonFile);
  console.time('extract data');
  var rawLocations = rawData['locations'];
  var rawTrip = [];
  for (var id in rawLocations) {
    var timestamp = new Date(parseInt(rawLocations[id].timestampMs));
    if ( timestamp >= startDate && timestamp < endDate){
      // console.log(timestamp.toLocaleString(), startDate.toLocaleString(), endDate.toLocaleString());
      rawTrip.push(rawLocations[id]);
    }
  }
  console.timeEnd('extract data', rawLocations.length, '>>>', rawTrip.length);
  db.storeTrip(rawTrip);
}

exports.loadTripFromZip = loadTripFromZip;
