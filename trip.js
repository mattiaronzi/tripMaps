/* use ES6 */

// a class representing a single trip
const uuid = require('uuid');

class Trip {
  constructor(data, startDate, endDate){
    this.uuid      = uuid.v4();
    this._rawData  = data;
    this.startDate = startDate;
    this.endDate   = endDate;
    this.data      = null;

    this.prepareData();
    setTimeout(this.printInConsole, 3000);
  }

  prepareData(){
    this.data = this._rawData.map(function(e){
      return {
        timestamp : parseInt(e.timestampMs),
        geo : {
          lat : e.latitudeE7 / 1e7,
          lng : e.longitudeE7 / 1e7,
        },
        accuracy : e.accuracy,
        activity : e.activity
      };
    });
  }

  // TODO computeLength()

  printInConsole(){
    console.log(this.data);
  }
}

exports.Trip = Trip;
