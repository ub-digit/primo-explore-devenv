

(function() {
    "use strict";
    'use strict';



    var app = angular.module('viewCustom', ['angularLoad']);


    /****************************************************************************************************/

    /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

    /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

    app.controller('fullViewItemViewController', ['angularLoad', '$http', '$stateParams', '$filter','$location',  function(angularLoad, $http, $stateParams, $filter, $location) {
        var self = this;
        self.translationSv = {
            "volume": "Exemplar",
            "location": "Placering",
            "status": "Status",
            "must_be_ordered": "Måste beställas",
            "available": "Tillgänglig",
            "not_for_home_loan": "Ej hemlån",
            "reading_room_only": "Beställs till läsesal",
            "loan_in_house_only": "Endast utlån på plats",
            "loaned": "Utlånad till",
            "reserved": "Reserverad",
            "waiting": "Väntar på avhämtning",
            "in_transit": "Under transport",
            "delayed": "Försenad",
            "under_acquisition": "Under inköp",
            "not_in_place": "Ej på plats",
            "unknown": "Okänd", 
        },
        self.translationEn = {
            "volume": "Item",
            "location": "Location",
            "status": "Status",
            "must_be_ordered": "Must be requested",
            "available": "Available",
            "not_for_home_loan": "Not for home loan",
            "reading_room_only": "Request to reading room",
            "loan_in_house_only": "Borrow on location",
            "loaned": "On loan until",
            "reserved": "Reserved",
            "waiting": "Waiting for pick up",
            "in_transit": "In transit",
            "delayed": "Overdue",
            "under_acquisition": "Ongoing purchase",
            "not_in_place": "Not on shelf",
            "unknown": "Unknown",
        },


        self.$onInit = function() {
            let bibidToUse = null;
            if (self.parentCtrl.service.serviceName === 'ovl') {
                let bibid = null;
                if (self.parentCtrl.item.pnx.control.ilsapiid) {
                    bibid = self.parentCtrl.item.pnx.control.ilsapiid;
                }
                else if (self.parentCtrl.item.pnx.control.sourcerecordid) {
                    bibid = self.parentCtrl.item.pnx.control.sourcerecordid;
                }
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


                    if (!bibidToUse) {
                        if (bibid.length === 1) {
                            if (bibid[0].indexOf("$$") >= 0) {
                                // takes care of posts that are merged into one post in Primo and only 
                                // has one external reference in the ilsapiid array (ie SFX and Gunda)
                                bibidToUse = parseInt(bibid[0].match(/O46GUB_KOHA(\d+)/)[1]);
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
                                            bibidToUse = parseInt(item.match(/O46GUB_KOHA(\d+)/)[1]);
                                        }
                                    });
                                    if (!bibidToUse) {
                                        typeOfMedia.forEach(function(item, index) {
                                            if (item.match(/O46GUB_VTLSvtls(\d+)/)) {
                                                // this is the one. Now get the bibid 
                                                bibidToUse = parseInt(item.match(/O46GUB_KOHA(\d+)/)[1]);
                                            }
                                        });
                                    }
                                }
                            }
                        }

                    }
                }
                self.serviceName = self.parentCtrl.service.serviceName;
                self.lang = $location.search().lang;
                self.lang_code = 'en';
                if (self.lang === "sv_SE") {
                    self.lang_code = "sv";
                }
                self.bibid = bibidToUse;
                if (!bibidToUse) { return; }
                self.loading = true;
                $http.get('https://bestall.ub.gu.se/api/biblios/' + bibidToUse + '?force=true').then(function(data) {
                    self.loading = false;
                    self.biblio = data.data.biblio;
                    self.extendedItems = data.data.biblio.items;
                    self.availibleCount = $filter('filter')(self.extendedItems, {is_availible: 'true'}).length;
                    self.notAvailibleCount = $filter('filter')(self.extendedItems, {is_availible: 'false'}).length;
                    self.totalCount = self.extendedItems.length;
                    self.getDateObj= function(myDate){
                        return new Date(myDate.substr(0,10));
                    };
                    self.getStatusText = function(code){
                        var isPresent = ['LOAN_IN_HOUSE_ONLY','READING_ROOM_ONLY','NOT_FOR_HOME_LOAN','LOANED','RESERVED','WAITING','IN_TRANSIT','DELAYED','DURING_ACQUISITION', 'NOT_IN_PLACE', 'AVAILABLE'].includes(code);
                        if (!isPresent) {
                            code = 'unknown';
                        }
                        if (self.lang === 'sv_SE') {
                            return self.translationSv[code.toLowerCase()];
                        }
                        return self.translationEn[code.toLowerCase()];
                        
                    };

                    self.toggleContent = function(id) {
                        let group = $filter('filter')(self.biblio.subscriptiongroups, {id: id});
                        group[0].expanded = !group[0].expanded;
                    };
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