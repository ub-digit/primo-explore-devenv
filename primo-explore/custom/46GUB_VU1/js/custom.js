(function () {
  "use strict";
  'use strict';

  var app = angular.module('viewCustom', ['angularLoad']);

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  app.controller('fullViewItemViewController', ['angularLoad', '$http', '$stateParams', function(angularLoad, $http, $stateParams) {
    var self = this;

    self.$onInit = function () {
      if(self.parentCtrl.service.serviceName === 'ovl') {
        var bibid = self.parentCtrl.item.pnx.control.ilsapiid;
        self.serviceName = self.parentCtrl.service.serviceName;
        self.lang = self.parentCtrl.displayLanguage;
        self.bibid = bibid;
        if(!bibid) { return; }
        $http.get('https://sunda.ub.gu.se/cgi-bin/items4primo.cgi?bibid='+bibid).then(function(data) {
          self.extendedItems = data.data.items;
        });
      }
    };
  }]);

  app.component('prmTopBarBefore', {
    template: ' <a href="http://www.ub.gu.se"><div class="ub-home-link"></div></a>'
  })();

  app.component('prmFullViewServiceContainerAfter', {
	  bindings: {parentCtrl: '<'},
	  controller: 'fullViewItemViewController',
    template: `
      <div class="sv-template">
        <a ng-if="$ctrl.serviceName ==='ovl'" class="arrow-link md-primoExplore-theme" href="http://sunda.ub.gu.se:8080/lib/item?id=chamo:{{$ctrl.bibid[0]}}&theme=gunda&locale=sv" target="_blank">Beställ och köa på exemplar 
          <prm-icon  external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" class="md-primoExplore-theme" role="img"><svg id="open-in-new_cache27" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

          <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
            <md-icon md-svg-icon="primo-ui:chevron-right" aria-label="icon-chevron-right" class="md-primoExplore-theme" role="img"><svg id="chevron-right" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

      </a>
        <div class="ub-list">
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
        </div>

        <a ng-if="$ctrl.serviceName ==='ovl'" class="arrow-link md-primoExplore-theme" href="http://sunda.ub.gu.se:8080/lib/item?id=chamo:{{$ctrl.bibid[0]}}&theme=gunda&locale=sv" target="_blank">Beställ och köa på exemplar 
          <prm-icon  external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" class="md-primoExplore-theme" role="img"><svg id="open-in-new_cache27" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

          <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
            <md-icon md-svg-icon="primo-ui:chevron-right" aria-label="icon-chevron-right" class="md-primoExplore-theme" role="img"><svg id="chevron-right" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>
        </a>
      </div>

      <div class="en-template">
        <a ng-if="$ctrl.serviceName ==='ovl'" class="arrow-link md-primoExplore-theme" href="http://sunda.ub.gu.se:8080/lib/item?id=chamo:{{$ctrl.bibid[0]}}&theme=gunda&locale=en" target="_blank">Ordering books, and waiting lists 
          <prm-icon  external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" class="md-primoExplore-theme" role="img"><svg id="open-in-new_cache27" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

          <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
            <md-icon md-svg-icon="primo-ui:chevron-right" aria-label="icon-chevron-right" class="md-primoExplore-theme" role="img"><svg id="chevron-right" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

      </a>
        <div class="ub-list">
          <div ng-repeat="item in $ctrl.extendedItems track by $index">
              <div layout="row" flex="100" layout-align="space-between center" class="layout-align-space-between-center layout-row flex-100 ub-item-list-item">
                <div class="md-list-item-text">
                  <h3>{{item.locationNameEn}}</h3>
                  <p>
                    <span ng-if="item.statusKey !== ''" class="availability-status {{item.statusKey}}">{{item.statusEn}}</span> <span ng-if="item.statusKey !=='' && item.callNumber !== ''">|</span>
                    <span ng-if="item.callNumber !== ''">Call Number: {{item.callNumber}}</span> <span ng-if="(item.statusKey !=='' || item.callNumber !=='') && item.units !== ''">|</span>
                    <span ng-if="item.units !== ''">Volume: {{item.units}}</span>
                  </p>
                </div>
              </div>
              </button>
              </prm-location>
              </md-list-item>
          </div>
        </div>

        <a ng-if="$ctrl.serviceName ==='ovl'" class="arrow-link md-primoExplore-theme" href="http://sunda.ub.gu.se:8080/lib/item?id=chamo:{{$ctrl.bibid[0]}}&theme=gunda&locale=en" target="_blank">Ordering books, and waiting lists 
          <prm-icon  external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" class="md-primoExplore-theme" role="img"><svg id="open-in-new_cache27" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>

          <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
            <md-icon md-svg-icon="primo-ui:chevron-right" aria-label="icon-chevron-right" class="md-primoExplore-theme" role="img"><svg id="chevron-right" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
            </md-icon>
            <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
          </prm-icon>
        </a>
      </div>`

  });


})();
