(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  //var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  var $ = window.jQuery;
  var App = window.App || {};
  var Truck = App.Truck;
  /* eslint-disable no-unused-vars */
  //var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  $.get(SERVER_URL, function(serverResponse) {
    console.log(serverResponse);
    for (var i = 0; i < serverResponse.length; i++) {
      checkList.addRow.call(checkList, serverResponse[i]);
    }
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);
