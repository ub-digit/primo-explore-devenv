(function() {
    "use strict";
    'use strict';

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

    /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

    /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

    app.controller('fullViewItemViewController', ['angularLoad', '$http', '$stateParams', function(angularLoad, $http, $stateParams) {
        var self = this;

        self.$onInit = function() {
            let bibidToUse = null;
            if (self.parentCtrl.service.serviceName === 'ovl') {
                let bibid = self.parentCtrl.item.pnx.control.ilsapiid;
                if (bibid) {
                    if (bibid.length === 1) {
                        if (bibid[0].indexOf("$$") >= 0) {
                            // takes care of posts that are merged into one post in Primo and only 
                            // has one external reference in the ilsapiid array (ie SFX and Gunda)
                            bibidToUse = parseInt(bibid[0].match(/O46GUB_VTLSvtls(\d+)/)[1]);
                        } else {
                            // takes care of posts that are not merged at all
                            bibidToUse = bibid[0];
                        }
                    } else if (bibid.length > 1) {
                        // takes care of posts that are merged and have two or more 
                        // external references in the ilsapiid array by looking in the delcategory 
                        // entry and scanning for the physical one. 
                        let typeOfMedia = self.parentCtrl.item.pnx.delivery.delcategory;
                        if (typeOfMedia) {
                            if (typeOfMedia.length > 1) {
                                // find the physichal 
                                typeOfMedia.forEach(function(item, index) {
                                    if (item.indexOf("$$VPhysical") >= 0) {
                                        // this is the one. Now get the bibid 
                                        bibidToUse = parseInt(item.match(/O46GUB_VTLSvtls(\d+)/)[1]);
                                    }
                                });
                                if (!bibidToUse) {
                                    typeOfMedia.forEach(function(item, index) {
                                        if (item.match(/O46GUB_VTLSvtls(\d+)/)) {
                                            // this is the one. Now get the bibid 
                                            bibidToUse = parseInt(item.match(/O46GUB_VTLSvtls(\d+)/)[1]);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
                self.serviceName = self.parentCtrl.service.serviceName;
                self.lang = self.parentCtrl.displayLanguage;
                self.bibid = bibidToUse;
                if (!bibidToUse) { return; }
                $http.get('https://koha-staging-intra.ub.gu.se/cgi-bin/koha/svc/items/primo?biblionumber=' + bibidToUse).then(function(data) {
                    self.extendedItems = data.data.items;
                });
            }
        };
    }]);

    app.component('prmTopBarBefore', {
        template: ' <a href="http://www.ub.gu.se"><div class="ub-home-link"></div></a>'
    });

    app.component('prmFullViewServiceContainerAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'fullViewItemViewController',
        templateUrl: "custom/46GUB_VU1/js/template.html"


    });


})();