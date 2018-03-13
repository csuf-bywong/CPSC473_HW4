(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl, function(serverResponse) {
      /* eslint-disable no-unused-vars */
      var id;
      for (var i = 0; i < serverResponse.length; i++) {
        if (serverResponse[i].emailAddress == key) {
          id = serverResponse[i].id;
        }
      }
      $.get(this.url + "/" + id, function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      });
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.get(this.serverUrl, function(serverResponse) {
      /* eslint-disable no-unused-vars */
      var id;
      for (var i = 0; i < serverResponse.length; i++) {
        if (serverResponse[i].emailAddress == key) {
          id = serverResponse[i].id;
        }
      }
      $.ajax(this.url + "/" + key, {
        type: "DELETE"
      });
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
