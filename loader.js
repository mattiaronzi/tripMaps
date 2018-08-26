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
                console.log('close stream');
                extractData(fileName, s, e, db.storeTrip);
            })
        );

      } else {
        entry.autodrain();
      }
    });
}

function extractData(jsonFile, startDate, endDate, callback){
  if (!startDate || !endDate){
    console.error('no dates to extract trip data');
    return;
  }
  // extract data based on start & and time (input by argv)
  console.log('reading JSON');
  var rawData = fs.readJSONSync(jsonFile);
  console.time('extract data');
  var rawLocations = rawData.locations;
  var rawTripData = [];
  for (var id in rawLocations) {
    var timestamp = new Date(parseInt(rawLocations[id].timestampMs));
    if ( timestamp >= startDate && timestamp < endDate){
      // console.log(timestamp.toLocaleString(), startDate.toLocaleString(), endDate.toLocaleString());
      rawTripData.push(rawLocations[id]);
    }
  }
  console.timeEnd('extract data', rawLocations.length, '>>>', rawTripData.length);
  if (callback){
    callback(rawTripData, startDate, endDate);
  }
}

exports.loadTripFromZip = loadTripFromZip;
