(function () {
  "use strict";
  'use strict';

  var app = angular.module('viewCustom', ['angularLoad']);

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  app.controller('fullViewItemViewController', ['angularLoad', '$http', function(angularLoad, $http) {
    var self = this;

    self.$onInit = function () {
      if(self.parentCtrl.service.serviceName === 'ovl') {
        var bibid = self.parentCtrl.item.pnx.control.ilsapiid;
        if(!bibid) { return; }
        self.test = '<a href="//www.sunet.se">foobar</a>';
        self.content = '';
        self.itemTemplate = `
          <div layout="row" flex="100" layout-align="space-between center" class="layout-align-space-between-center layout-row flex-100 ub-item-list-item">
          <div class="md-list-item-text">
          <h3>LIBRARY_NAME</h3>
          <p>
          <span class="availability-status AVAILCLASS">AVAILABILITY</span>
          <span>OTHER</span>
          </p>
          </div>
          </div>
          </button>
          </prm-location>
          </md-list-item>
          `;
        $http.get('http://lunda.ub.gu.se:8000/cgi-bin/primo_sok_json_extest.cgi?bibid='+bibid).then(function(data) {
          console.log(data.data.items);
          data.data.items.forEach(function(item) {
            var tmpl = self.itemTemplate;
            var availability = 'Unavailable';
            var availClass = 'unavailable';
            tmpl = tmpl.replace('LIBRARY_NAME', item.library);
            if(item.available === 1) {
              availability = 'Available';
              availClass = 'available';
            }
            tmpl = tmpl.replace('AVAILABILITY', availability);
            tmpl = tmpl.replace('AVAILCLASS', availClass);
            tmpl = tmpl.replace('OTHER', ' ; '+item.callNumber);
            self.content += tmpl;
          });
        });
      }
    };
  }]);

  app.component('prmFullViewServiceContainerAfter', {
	  bindings: {parentCtrl: '<'},
	  controller: 'fullViewItemViewController',
    template: function($element, $attrs) {
      return `<span ng-bind-html="$ctrl.content"></span>`;
    }
  });
})();
