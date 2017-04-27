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
        $http.get('http://lunda.ub.gu.se:8000/cgi-bin/items4primo.cgi?bibid='+bibid).then(function(data) {
          self.extendedItems = data.data.items;
        });
      }
    };
  }]);

  app.component('prmFullViewServiceContainerAfter', {
	  bindings: {parentCtrl: '<'},
	  controller: 'fullViewItemViewController',
    template: `
      <div ng-repeat="item in $ctrl.extendedItems track by $index">
          <div layout="row" flex="100" layout-align="space-between center" class="layout-align-space-between-center layout-row flex-100 ub-item-list-item">
            <div class="md-list-item-text">
              <h3>{{item.locationNameSv}}</h3>
              <p>
                <span ng-if="item.statusKey !== ''" class="availability-status {{item.statusKey}}">{{item.statusSv}}</span> <span ng-if="item.statusKey !=='' && item.callNumber !== ''">|</span>
                <span ng-if="item.callNumber !== ''">Hylla: {{item.callNumber}}</span> <span ng-if="(item.statusKey !=='' || item.callNumber !=='') && item.units !== ''">|</span>
                <span ng-if="item.units !== ''">Volym: {{item.units}}</span>
              </p>
            </div>
          </div>
          </button>
          </prm-location>
          </md-list-item>
      </div>
    `
  });


})();
