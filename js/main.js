  var dataBank = {};
      require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/widgets/Legend",
        "esri/symbols/PointSymbol3D",
        "esri/symbols/ObjectSymbol3DLayer","esri/widgets/LayerList",
        "dojo/promise/all",
        "dojo/Deferred",
        "dojo/request/xhr",
        "dojo/query",
        "bootstrap/Tab",
        "bootstrap/Collapse",
        "dojo/domReady!"
      ], function(
        Map, SceneView, FeatureLayer, Legend, PointSymbol3D,
        ObjectSymbol3DLayer, LayerList, all, Deferred, xhr, query, tab
      ) {

        var map = new Map({
          basemap: "dark-gray-vector"
        });

        var symbol = new PointSymbol3D({
          symbolLayers: [new ObjectSymbol3DLayer({
            resource: {
              primitive: "cylinder"
            },
            width: 50 // width of the symol in meters
          })]
        })
        var renderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: symbol,
          visualVariables: [{
            type: "size",
            field: "MLSVIO",
            legendOptions: {
              title: "Number of MLS Violations per Parcel (EXTRUDED HEIGHT)"
            },
            stops: [{
                value: 0,
                size: 25,
                label: "0"
              },
              {
                value: 160,
                size: 1000,
                label: "160"
              }
            ],
            axis: "height"
          }, {
            type: "size",
            axis: "width-and-depth",
            useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
          }, {
            type: "color",
            field: "FIREVIOL",

            legendOptions: {
              title: "Number of Fire Violations per Parcel"
            },
            stops: [{
                value: 2,
                color: [255, 255, 204, .7],
                label: "<2"
              },
              {
                value: 3,
                color: [255, 237, 160, .7],
                label: "<3"
              },
              {
                value: 5,
                color: [254, 178, 76, .7],
                label: "<5"
              },
              {
                value: 10,
                color: [252, 78, 42, .7],
                label: "<10"
              },
              {
                value: 20,
                color: [128, 0, 38, .7],
                label: ">20"
              }
            ]
          }]
        };
        var featureLayer = new FeatureLayer({
          url: "https://services5.arcgis.com/5R55vsKfq7f14num/arcgis/rest/services/finalfinal/FeatureServer/0",
          title: "Property Inspection Violations",
          renderer: renderer,
          outFields: ["*"],
          // 	popupTemplate: { // autocasts as new PopupTemplate()
          //   title: "ParcelID: {RID}",
          //   content: "<p>The property located at, <b>{Match_addr}</b> owened by " +
          // 						" <b>{PROPERTY_O}</b> had the following MLS and FIRE inspection/violation information:</p>" +
          // 						"<ul><b>{MLSINSP}</b> MLS inspections with</li>" +
          // 						"<li><b>{MLSVIO}</b> MLS violations</li></ul>" +
          // 						"<ul><li><b>{FIREINSP}</b> FIRE inspections with</li>" +
          // 						"<li><b>{FIREVIOL}</b> FIRE violations</li></ul>"
          // }
        });
        map.add(featureLayer);
        var featureLayer1 = new FeatureLayer({
          url: "https://services5.arcgis.com/5R55vsKfq7f14num/ArcGIS/rest/services/ZONING_ZONE_CATAGORIES_WGS84/FeatureServer/0",
          title: "Zoning Areas",
          //renderer: renderer,
          outFields: ["*"],
          opacity:.25
          //  popupTemplate: { // autocasts as new PopupTemplate()
          //   title: "ParcelID: {RID}",
          //   content: "<p>The property located at, <b>{Match_addr}</b> owened by " +
          //            " <b>{PROPERTY_O}</b> had the following MLS and FIRE inspection/violation information:</p>" +
          //            "<ul><b>{MLSINSP}</b> MLS inspections with</li>" +
          //            "<li><b>{MLSVIO}</b> MLS violations</li></ul>" +
          //            "<ul><li><b>{FIREINSP}</b> FIRE inspections with</li>" +
          //            "<li><b>{FIREVIOL}</b> FIRE violations</li></ul>"
          // }
         });
var featureLayer3 = new FeatureLayer({
          url: "https://services5.arcgis.com/5R55vsKfq7f14num/arcgis/rest/services/mls_inspections_geocoded_pts_1/FeatureServer/0",
          title: "MLS All Inspections",
          //renderer: renderer,
          outFields: ["*"],
          opacity:.65
          //  popupTemplate: { // autocasts as new PopupTemplate()
          //   title: "ParcelID: {RID}",
          //   content: "<p>The property located at, <b>{Match_addr}</b> owened by " +
          //            " <b>{PROPERTY_O}</b> had the following MLS and FIRE inspection/violation information:</p>" +
          //            "<ul><b>{MLSINSP}</b> MLS inspections with</li>" +
          //            "<li><b>{MLSVIO}</b> MLS violations</li></ul>" +
          //            "<ul><li><b>{FIREINSP}</b> FIRE inspections with</li>" +
          //            "<li><b>{FIREVIOL}</b> FIRE violations</li></ul>"
          // }
        });


        map.add(featureLayer3);
var featureLayer2 = new FeatureLayer({
          url: "https://services5.arcgis.com/5R55vsKfq7f14num/arcgis/rest/services/fire_violations/FeatureServer/0",
          title: "Fire All Inspections",
          //renderer: renderer,
          outFields: ["*"],
          opacity:.65
          //  popupTemplate: { // autocasts as new PopupTemplate()
          //   title: "ParcelID: {RID}",
          //   content: "<p>The property located at, <b>{Match_addr}</b> owened by " +
          //            " <b>{PROPERTY_O}</b> had the following MLS and FIRE inspection/violation information:</p>" +
          //            "<ul><b>{MLSINSP}</b> MLS inspections with</li>" +
          //            "<li><b>{MLSVIO}</b> MLS violations</li></ul>" +
          //            "<ul><li><b>{FIREINSP}</b> FIRE inspections with</li>" +
          //            "<li><b>{FIREVIOL}</b> FIRE violations</li></ul>"
          // }
        });


        map.add(featureLayer2);

        var bar = new Charts.BarChart('chart1', {});
      console.log(featureLayer1);
        map.add(featureLayer1);
        var view = new SceneView({
          container: "mapViewDiv",
          padding: {
            top: 50
          },
          map: map
        });
        view.then(function() {
          view.goTo({
            center: [-79.261723, 43.572808],
            tilt: 70,
            zoom: 9
          })
        });
        var legend = new Legend({
          view: view,
          container:'legendary'
        });

        //view.ui.add(legend, "bottom-right");
        var layerList = new LayerList({
          view: view,container: "layerList"
        });

        // Add widget to the top right corner of the view
        //view.ui.add(layerList, "bottom-left");

        view.on("click", function(evt) {
          // data storage
          dataBank.parcels = dataBank.parcels || {}
          dataBank.cart = dataBank.cart || {}

          view.hitTest(evt.screenPoint).then(function(response) {
            var graphic = response.results[0].graphic;
            console.log(graphic);
            bar.clear();
            bar.add({
              label: "MI",
              value: graphic.attributes.MLSINSP,
              options: {
                bar_color: "#99d8c9",

              }
            });
            bar.add({
              label: "MV",
              value: graphic.attributes.MLSVIO,
              options: {
                bar_color: "#2ca25f",              }
            });
            bar.add({
              label: "FI",
              value: graphic.attributes.FIREINSP,
              options: {
                bar_color: "#bcbddc"              }
            });
            //       bar.add({
            //   label: "FI",
            //   value: graphic.attributes.FIREVOL,
            //   options: {
            //     bar_color: "#756bb1"              }
            // });
            bar.draw();

            // promise to return fire request
            function fireRequest(UID) {
              var fireInspectionsURL = `${API_URL}/dataproject/fire?$filter=RID eq '${UID}'`;
              var deferred = new Deferred();
              xhr(fireInspectionsURL, {
                  handleAs: "json"
                })
                .then(
                  // success
                  function(data) {
                    if (data.value.length == 0) {
                      deferred.resolve([]);
                    } else {
                      var fireViolationsURL = `${API_URL}/fireprevention/extractInspection?$filter=propertyAddress eq '${data.value[0].PROPERTYAD}'&$orderby=INSPECTIONS_CLOSEDDATE desc,VIOLATIONS_ITEM_NUMBER asc`;
                      xhr(fireViolationsURL, {
                          handleAs: "json"
                        })
                        .then(
                          // success
                          function(data2) {
                            deferred.resolve([data.value, data2.value]);
                          },
                          //error
                          function() {
                            deferred.cancel("Fire Violations API failed");
                          }
                        );
                    }
                  },
                  //error
                  function() {
                    deferred.cancel("Fire API failed");
                  }
                );
              return deferred.promise;
            }
            // promise to return MLS request
            function mlsRequest(UID) {
              var deferred = new Deferred();
              var mlsInspectionsURL = `${API_URL}/dataproject/mls?$filter=RID eq '${UID}'`;
              xhr(mlsInspectionsURL, {
                  handleAs: "json"
                })
                .then(
                  // success
                  function(data) {
                    if (data.value.length == 0) {
                      deferred.resolve([]);
                    } else {
                      var mlsViolations = `${API_URL}/dataproject/def?$filter=INVESTIGATIONID eq '${data.value[0].INVESTIGATIONID}'`;
                      if (data.value.length > 1) {
                        for (var i = 1; i < data.value.length; i++) {
                          mlsViolations += ` or INVESTIGATIONID eq '${data.value[i].INVESTIGATIONID}'`
                        }
                      }
                      xhr(mlsViolations, {
                          handleAs: "json"
                        })
                        .then(
                          // success
                          function(data2) {
                            deferred.resolve([data.value, data2.value]);
                          },
                          //error
                          function() {
                            deferred.cancel("MLS deficiencies API failed");
                          }
                        );
                    }
                  },
                  //error
                  function() {
                    deferred.cancel("MLS API failed");
                  }
                );
              return deferred.promise;
            }
            if (graphic) {
              // console.log("Top graphic found! Here it is: ", graphic);
              var UID = graphic.attributes.OBJECTID || false;
              if (!UID) return false;
              dataBank.parcels[UID] = dataBank.parcels[UID] || {};
              // check if data aready retrieved
              openDrawer('selecteddata');
              if (dataBank.parcels[UID].hasOwnProperty('fireInspections') && dataBank.parcels[UID].hasOwnProperty('mlsInspections')) {
                displayBuildingData(UID);
              } else {
                loaderStart();
                all([fireRequest(UID), mlsRequest(UID)])
                  .then(function(results) {
                    loaderStop();
                    dataBank.parcels[UID] = {
                      fireInspections: results[0],
                      mlsInspections: results[1]
                    }
                    displayBuildingData(UID)
                  });
              }
            }
          });
        });

        //////////////////////////////////
        // Data tab functions
        //////////////////////////////////
        function displayDataTab(html) {
          html = html || "Error!";
          query('#selecteddata .innertab').attr("innerHTML", html);
        }
        function getBuildingData(uid){
          var objReturn = {},
          isFire = dataBank.parcels[uid].hasOwnProperty('fireInspections') && Array.isArray(dataBank.parcels[uid].fireInspections),
          isMls = dataBank.parcels[uid].hasOwnProperty('mlsInspections') && Array.isArray(dataBank.parcels[uid].mlsInspections);
          if (isFire && dataBank.parcels[uid].fireInspections[0][0]) {
            objReturn.address = dataBank.parcels[uid].fireInspections[0][0].PROPERTYAD;
            objReturn.owner = dataBank.parcels[uid].fireInspections[0][0].PROPERTY_O || 'n/a';
            objReturn.fireInspectionSummary = {
              inspections: parseInt(dataBank.parcels[uid].fireInspections[0][0].INSPECTION),
              violations: parseInt(dataBank.parcels[uid].fireInspections[0][0].VIOLATIONS)
            };
          }
          if (isMls && dataBank.parcels[uid].mlsInspections[0][0]) {
            objReturn.address = objReturn.address || dataBank.parcels[uid].mlsInspections[0][0].ADDRESS;
            objReturn.mlsInspectionSummary = {
              inspections: dataBank.parcels[uid].mlsInspections[0].length,
              violations: dataBank.parcels[uid].mlsInspections[1].length,
            }
          }
          return objReturn;
        }
        function displayBuildingData(uid) {
          if (!dataBank.parcels.hasOwnProperty(uid)) {
            return false;
          }
          openDrawer('selecteddata');
          //console.log(dataBank.parcels[uid]);
          var isFire = dataBank.parcels[uid].hasOwnProperty('fireInspections') && Array.isArray(dataBank.parcels[uid].fireInspections),
            isMls = dataBank.parcels[uid].hasOwnProperty('mlsInspections') && Array.isArray(dataBank.parcels[uid].mlsInspections),
            building = getBuildingData(uid),
            violations = isFire ? dataBank.parcels[uid].fireInspections[1].filter(function(el) {
              return el.VIOLATIONS_ITEM_NUMBER != 0
            }) : [],
            mlsInspections = isMls ? dataBank.parcels[uid].mlsInspections[0] : null,
            deficiencies = isMls ? dataBank.parcels[uid].mlsInspections[1] : [],
            isButton = ((isFire && violations.length > 0) || (isMls && deficiencies.length > 0)) && !dataBank.cart[uid];
          // display Building info
          var html =
            `<div class="row">
            <div class="col-xs-12"><h3>Building Report</h3></div>
            <div class="col-xs-4">Address</div>
            <div class="col-xs-8">${building.address}</div>
            <div class="col-xs-4">Owner</div>
            <div class="col-xs-8">${building.owner||'n/a'}</div>
            <div class="col-xs-12">${building.fireInspectionSummary.inspections} Fire Inspection${building.fireInspectionSummary.inspections>1?`s`:``} (${building.fireInspectionSummary.violations} Violation${building.fireInspectionSummary.violations>1?`s`:``})</div>
            <div class="col-xs-12">${building.mlsInspectionSummary.inspections} MLS Inspection${building.mlsInspectionSummary.inspections>1?`s`:``} (${building.mlsInspectionSummary.violations} Violation${building.mlsInspectionSummary.violations>1?`s`:``})</div>
            ${isButton?`<div class="col-xs-12 text-right"><button class="btn btn-sm add2cart"><img src="Shopping_Cart.svg" width=15 height=15> Add to Cart</button></div>`:``}
            ${dataBank.cart[uid]?`<div class="col-xs-12 text-right"><img src="Shopping_Cart.svg" width=17 height=17> added to your cart</div>`:``}
          </div>`;
          // Fire Code violations
          if (isFire && violations.length > 0) {
            html +=
              `<div class="row"><div class="col-xs-12">
              &nbsp;
            </div></div><div class="row">
              <div class="col-xs-12"><h5>Fire Inspections</h5></div>
              <div class="col-xs-12"><table class="table table-stripped table-condensed">
                <thead>
                  <tr>
                    <th>Violation description</th>
                  </tr>
                </thead>
                <tbody>
                  ${violations.map(function(obj){
                    return `<tr>
                      <td>${obj.VIOLATION_DESCRIPTION||'n/a'}</td>
                    </tr>`
                  }).join('')}
                </tbody>
              </table></div>
            </div>`;
          }
          // MLS inspections
          if (isMls && deficiencies.length > 0) {
            html +=
              `<div class="row"><div class="col-xs-12">
              &nbsp;
            </div></div><div class="row">
              <div class="col-xs-12"><h5>MLS Inspections</h5></div>
              <div class="col-xs-12"><table class="table table-stripped table-condensed">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Sub</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  ${deficiencies.map(function(obj){
                    return `<tr>
                      <td>${obj.LOCATION||'n/a'}</td>
                      <td>${obj.SUBLOCATION||'n/a'}</td>
                      <td>${obj.STATUS}</td>
                    </tr>
                    <tr>
                      <td colspan="3">${obj.DETAILS}</td>
                    </tr>`
                  }).join('')}
                </tbody>
              </table></div>
            </div>`;
          }

          // display HTML in tab
          displayDataTab(html);
          if (isButton) {
            query(".add2cart").on("click", function() {
              add2cart(uid);
              displayBuildingData(uid);
            })
          }
        }

        //////////////////////////////////
        // Drawer functions
        //////////////////////////////////
        // show/hide/toggle drawer
        function openDrawer(tabName) {
          tabName = tabName || 'settings';
          document.getElementsByClassName('js-drawer')[0].classList.add('is-active');
          query('a[href="#' + tabName + '"]').tab('show')
        }
        function closeDrawer() {
          document.getElementsByClassName('js-drawer')[0].classList.remove('is-active');
        }
        function toggleDrawer() {
          if (document.getElementsByClassName('js-drawer')[0].classList.contains('is-active')) {
            closeDrawer()
          } else {
            openDrawer()
          }
        }
        // on button click -> toggle the drawer
        document.getElementsByClassName('js-drawer-toggle')[0].addEventListener('click', toggleDrawer);
        // close the drawer if click on brand
        document.getElementById('calciteToggleNavbar').addEventListener('click', closeDrawer);
        // hit escape to close drawer
        document.onkeydown = function(evt) {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
          } else {
            isEscape = (evt.keyCode == 27);
          }
          if (isEscape) {
            closeDrawer();
          }
        };

        //////////////////////////////////
        // Preloader functions
        //////////////////////////////////
        // preloader
        function loaderStart() {
          displayDataTab(`<div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>`)
        }
        function loaderStop() {
          var elements = document.getElementsByClassName('spinner');
          while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
          }
        }

        /////////////////////////////////////
        // cart functions
        /////////////////////////////////////
        function displayCartTab(html) {
          html = html || "Error!";
          query('#cartContent').attr("innerHTML", html);
        }
        function add2cart(uid) {
          dataBank.cart = dataBank.cart || {};
          dataBank.cart[uid] = dataBank.parcels[uid];
        }
        function deleteFromCart(item) {
          var uid = item.target.dataset.uid;
          if (dataBank.cart.hasOwnProperty(uid)) {
            delete dataBank.cart[uid];
          }
          displayCart();
        }
        function displayCart() {
          var htmlcart = '';
          for (var uid in dataBank.cart) {
            if (dataBank.cart.hasOwnProperty(uid)) {
              htmlcart += `<div class="col-xs-10">${dataBank.cart[uid].fireInspections[0][0].PROPERTYAD}</div>
                <div class="col-xs-2"><p><button class="btn btn-xs deleteCart" data-uid="${uid}">X</button></p></div>`
            }
          }
          if (htmlcart != '') {
            htmlcart+='<div class="col-xs-12 text-right"><button class="btn btn-sm downloadData">Download Data as CSV (Excel)</button></div>';
            displayCartTab(htmlcart);
            query(".deleteCart").on('click', deleteFromCart);
            query(".downloadData").on('click', downloadData);
          } else {
            displayCartTab(`<div class="col-xs-12">
                Your cart is empty, you don't have anything to download.
              </div>`);
          }
        }
        function downloadData(){
          var now = new Date();
          var filename=`buildingData_${now.getTime()}.csv`;
          // create proper object to be transformed to csv
          var rows = [];
          for (var uid in dataBank.cart) {
            if (dataBank.cart.hasOwnProperty(uid)) {
              var isFire = dataBank.parcels[uid].hasOwnProperty('fireInspections') && Array.isArray(dataBank.parcels[uid].fireInspections),
              isMls = dataBank.parcels[uid].hasOwnProperty('mlsInspections') && Array.isArray(dataBank.parcels[uid].mlsInspections),building = getBuildingData(uid),
              violations = isFire ? dataBank.parcels[uid].fireInspections[1].filter(function(el) {
                return el.VIOLATIONS_ITEM_NUMBER != 0
              }) : [],
              deficiencies = isMls ? dataBank.parcels[uid].mlsInspections[1] : [];
              if (violations.length>0){
                for (var i = 0; i < violations.length; i++) {
                  rows.push([
                    building.address,
                    building.owner,
                    'Fire Code Violation',
                    violations[i].VIOLATION_DESCRIPTION
                  ])
                }
              }
              if (deficiencies.length>0){
                for (var j = 0; j < deficiencies.length; j++) {
                  rows.push([
                    building.address,
                    building.owner,
                    'MLS Inspection deficiency',
                    deficiencies[j].DETAILS
                  ])
                }
              }
            }
          }
          exportToCsv(filename, rows);
        }
        // on Cart Tab select
        query('a[href="#cart"]').on('click', displayCart);
        // grabbed here => https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        function exportToCsv(filename, rows) {
          var processRow = function(row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
              var innerValue = row[j] === null ? '' : row[j].toString();
              if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
              };
              var result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
              if (j > 0)
                finalVal += ',';
              finalVal += result;
            }
            return finalVal + '\n';
          };
          var csvFile = '';
          for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
          }
          var blob = new Blob([csvFile], {
            type: 'text/csv;charset=utf-8;'
          });
          if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
          } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", filename);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        }
      });