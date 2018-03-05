(function(window) {
  "use strict";
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) {
    console.log("Adding order for " + order.emailAddress); /* eslint-disable-line no-console */
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId) {
    console.log("Delivering order for " + customerId); /* eslint-disable-line no-console */
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function() {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.truckId + " has pending orders:"); /* eslint-disable-line no-console */
    customerIdArray.forEach(function(id) {
      console.log(this.db.get(id)); /* eslint-disable-line no-console */
    }.bind(this));
  };

  App.Truck = Truck;
  window.App = App;
})(window);
