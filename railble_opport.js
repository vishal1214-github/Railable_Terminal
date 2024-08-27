// Initialize Bootstrap tabs after document is ready
$(document).ready(function () {

    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(FetchCmdtSmry);
    $('.nav-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});


$(document).ready(function () {
    

    FetchGISSfmy(); // Call the function to fetch GIS data
    FetchZnSmry();
    FetchCmdtSmry();

    FetchTopznl();
    //FetchCmdtDt("");
    


});

var map;
var bhuvan;

$(document).ready(function () {
    // Initialize your map
    map = L.map('map').setView([22.9734, 78.6569], 5);
    bhuvan = L.tileLayer.wms('https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/', {
        layers: 'india3'
    });
    bhuvan.addTo(map);
});

  function showResMod(zone)
{
    $("#loadingModal").modal('show');
    alert("zone :" +zone);
}


function FetchTopznl() {
    var myurl = "/RailSAHAY/TeriDtJson";

    var htmlstr = '<table id="AlZn" class="table table-striped table-bordered table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th style="text-align: center;">Zone</th>' +
        '<th style="text-align: center;">Total Freight (All Modes)</th>' +
        '<th style="text-align: center;">Rail  Share</th>' +
        '<th style="text-align: center;">Rail-Coefficient (%)</th>' +
        '<th style="text-align: center;">Railable </th>' +
        '<th style="text-align: center;">Railable (%)</th>' +
        '<th style="text-align: center;">Non-Railable </th>' +
        '<th style="text-align: center;">Non-Railable (%)</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    $.ajax({
        url: myurl,
        type: "POST",
        data: { Qry: 'TOP_ZONES_RLBL' },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log("FetchTopznl success:", data);

            var obj = data; // No need to parse if dataType is "json"
            for (var i = 0; i < obj.Data.length; i++) {
                htmlstr += '<tr><td class="text-center">' + obj.Data[i].zone_name + '</td>' +
                    '<td class="text-center">' + obj.Data[i].tot_frgt_shr + '</td>' +
                    '<td class="text-center">' + obj.Data[i].rail_shr + '</td>' +
                    '<td class="text-center">' + obj.Data[i].rail_coef + '</td>' +
                    '<td class="text-center">' + obj.Data[i].railble_shr + '</td>' +
                    '<td class="text-center">' + obj.Data[i].railble_percnt + '</td>' +
                    '<td class="text-center">' + obj.Data[i].non_railble_shr + '</td>' +
                    '<td class="text-center">' + obj.Data[i].non_railble_percnt +'</td></tr>';
            }
            htmlstr += '</tbody></table>';
            $("#divAlZnDt").html(htmlstr);           $

            // Initialize DataTable after adding the table to the DOM
            $('#AlZn').DataTable({
                paging: true,
                searching: true,
                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        },
        error: function (xhr, status, error) {
            console.error("FetchTopznl error:", status, error);
            // Handle error cases if needed
        }
    });
}


function FetchCmdtDt(ZoneName) {
    $('#DivCmdtWsIR').hide();
    var myurl = "/RailSAHAY/TeriDtJson";

    if(ZoneName=="")
       $("#comdta").text("Commodity-wise Share (IR)");
    else
       $("#comdta").text("Commodity-wise Share ("+ZoneName+")");

    $.ajax({
        url: myurl,
        type: "POST",
        data: { Qry: 'FETCH_ZONAL_DATA', ZoneName: ZoneName },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log("FetchCmdtDt FETCH_ZONAL_DATA success:", data);

            var htmlstr = '<div class="table-responsive">' +
                '<table class="table align-items-center">' +
                '<tbody>';

            for (var i = 0; i < data.Data.length; i++) {
                var item = data.Data[i];
                var accordionId = 'accordion-' + i;

                htmlstr += '<tr>' +
                    '<td class="">' +
                    '<div class="d-flex px-2 py-1 align-items-center">' +
                    '<div class="ms-4">' +
                    '<p class="text-xs font-weight-bold mb-0">Commodity</p>' +
                    '<h6 class="text-sm mb-0">' + item.cmdt_desc + '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Total Freight</p>' +
                    '<h6 class="text-sm mb-0">' + item.tot_grft_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Rail Share</p>' +
                    '<h6 class="text-sm mb-0">' + item.rail_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Balance</p>' +
                    '<h6 class="text-sm mb-0">' + item.balnc_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Railable </p>' +
                    '<h6 class="text-sm mb-0">' + item.railble_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Railable(%)</p>' +
                    '<h6 class="text-sm mb-0">' + item.rail_coef_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td >' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Non-Railable</p>' +
                    '<a class="text-sm mb-0 nr-link" data-bs-toggle="collapse" data-bs-target="#' + accordionId + '" style="font-weight:bold;color:red;">' + item.non_railble_shr + '</a>' +
                    '</div>' +
                    '</td>' +
                    '<tr> <td colspan="7" style="border:0px; padding:0px;margin:0px;"> <div id="' + accordionId + '" class="collapse"><div class="card card-body nr-rmrk" ><p class="resn-head">Non-Railable Reason</p>' + item.non_railble_res + '</div></div></td> </tr>'
                    '</tr>';
            }

            htmlstr += '</tbody></table></div>';
            $("#DivCmdtWs").html(htmlstr);

            // Add event listener for accordion behavior
            $('.collapse').on('show.bs.collapse', function () {
                $('.collapse.show').collapse('hide');
            });

            console.log("FetchCmdtDt htmlstr" + htmlstr);
        },
        error: function (xhr, status, error) {
            console.error("FetchCmdtDt error:", status, error);
            // Handle error cases if needed
        }
    });
}


//   


function showZnWsDt(feature) {
    var htmlstr = '<div class="card">' +
        '</div>' +
        '<div class="table-responsive">' +
        '<table class="table align-items-center table-bordered table-striped">' +
        '<tbody>' +
        '<tr>' +
        '<td class="w-30">' +
        '<div class="d-flex px-2 py-1 align-items-center">' +
        '<div class="ms-4">' +
        '<p class="text-xs font-weight-bold mb-0">Zone Name:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.zone_name + '</h6>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center" style="background-color:#4dff4d;">' +
        '<p class="text-xs font-weight-bold mb-0">Total Freight Share:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.tot_frgt_shr + '</h6>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center">' +
        '<p class="text-xs font-weight-bold mb-0">Total Rail Share:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.tot_rail_shr + '</h6>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center">' +
        '<p class="text-xs font-weight-bold mb-0">Balance Share:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.blnc_shr + '</h6>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center" style="background-color:#ffff33;">' +
        '<p class="text-xs font-weight-bold mb-0">Railable Share:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.railcble_shr + '</h6>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center">' +
        '<p class="text-xs font-weight-bold mb-0">Rail Coefficient:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.rail_Coeff + '</h6>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="text-center" style="background-color:#ff4000;">' +
        '<p class="text-xs font-weight-bold mb-0">Non-Railable Share:</p>' +
        '<h6 class="text-sm mb-0">' + feature.properties.non_railble_shr + '</h6>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';

    $("#DivZnWs").html(htmlstr);
}




function showDtIR(feature) {
    if (feature.properties.zone_name === "IR") {
        // var htmlstr2 = '<table class="table table-bordered table-striped">' +
        //             '<tr><td class="lalval">Zone Name</td>'+
        //             '<td class="lalval">Total Freight Share</td>'+
        //             '<td class="lalval">Total Rail Share</td>'+
        //             '<td class="lalval">Balance Share</td>'+
        //             '<td class="lalval">Railable Share</td>'+
        //             '<td class="lalval">Rail Coefficient</td>'+
        //             '<td class="lalval">Non-Railable Share</td></tr>' +
        //             '<tr><td class="lalval">' + feature.properties.zone_name + '</td>'+
        //             '<td class="lalval">' + feature.properties.tot_frgt_shr + '</td>'+
        //             '<td class="lalval">' + feature.properties.tot_rail_shr + '</td>'+
        //             '<td class="lalval">' + feature.properties.blnc_shr + '</td>'+
        //             '<td class="lalval">' + feature.properties.railcble_shr + '</td>'+
        //             '<td class="lalval">' + feature.properties.rail_Coeff + '</td>'+
        //             '<td class="lalval">' + feature.properties.non_railble_shr + '</td></tr>' +
        //             '</table>';
        // $("#DivZnWsIR").html(htmlstr2);
        $("#totfrgtshr").html(feature.properties.tot_frgt_shr);
        $("#totrailshr").html(feature.properties.tot_rail_shr);
        $("#railcbleshr").html(feature.properties.railcble_shr);
        $("#nonrailableshr").html(feature.properties.non_railble_shr);
        $('#railshare').html(((feature.properties.tot_rail_shr / feature.properties.tot_frgt_shr) * 100).toFixed(2));
        $('#railable').html(((feature.properties.railcble_shr / feature.properties.tot_frgt_shr) * 100).toFixed(2));
        $('#nonrailable').html(((feature.properties.non_railble_shr / feature.properties.tot_frgt_shr) * 100).toFixed(2));
        $('.plant-count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
}


var ZnArray = [];
function FetchZnSmry() {
    var myurl = "/RailSAHAY/TeriDtJson";

    $.ajax({
        url: myurl,
        type: "POST",
        data: { Qry: 'ZONAL_SMRY' },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log("FetchZnSmry success:", data);
            // Process your data here as needed

            ZnArray = [['Zone', 'Total Rail Share', 'Railable Share', 'Non-Railable Share', { role: 'annotation' }]];

            data.Data.forEach(function (item) {
                if (item.zone_name == "G.TOTAL") { return; }


                ZnArray.push([item.zone_name, parseFloat(item.tot_rail_shr), parseFloat(item.railcble_shr), parseFloat(item.non_railble_shr), '']);


            });
            //$("#loadingModal").modal('hide');
            console.log("ZnArray-:" + ZnArray);

        },
        error: function (xhr, status, error) {
            console.error("FetchZnSmry error:", status, error);
            // Handle error cases if needed
        }
    });
}

//   function chartdraw(){

//  var return_value=FetchCmdtSmry();
//  do{
//   return_value=FetchCmdtSmry();
//  }while(return_value!="success");
// drawCommodityChart();

//   }

var CmdtArray = [];
function FetchCmdtSmry() {
    var myurl = "/RailSAHAY/TeriDtJson";

    $.ajax({
        url: myurl,
        type: "POST",
        data: { Qry: 'CMDT_SMRY' },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log("FetchCmdtSmry success:", data);
            // Process your data here as needed

            CmdtArray = [['Commodity', 'Total Rail Share', 'Railable Share', 'Non-Railable Share', { role: 'annotation' }]];

            data.Data.forEach(function (item) {
                if (item.cmdy_name == "G.TOTAL") { return; }
                CmdtArray.push([item.cmdy_name, parseFloat(item.tot_rail_shr), parseFloat(item.railcble_shr), parseFloat(item.non_railble_shr), '']);
            });

            console.log("CmdtArray Before-:" + CmdtArray);
            var chrtsdata = new google.visualization.arrayToDataTable(CmdtArray);

            var options = {
                width: '100%',
                height: '100%',
                legend: { position: 'none' },
                bar: { groupWidth: '75%' },
                isStacked: true,
                series: {
                    0: { color: 'green' },
                    1: { color: 'yellow' },
                    2: { color: 'red' },
                },
                animation: {
                    duration: 1000,
                    easing: 'out',
                }
            };

            var chart = new google.charts.Bar(document.getElementById('CmdtCharts'));


            chart.draw(chrtsdata, google.charts.Bar.convertOptions(options));
            console.log("CmdtArray After-:" + CmdtArray);



            var htmlstr = '<div class="table-responsive">' +
                '<table class="table align-items-center">' +
                '<tbody>';

            var obj = data; // No need to parse if dataType is "json"

            for (var i = 0; i < obj.Data.length; i++) {
                htmlstr += '<tr>' +
                    '<td class="w-30">' +
                    '<div class="d-flex px-2 py-1 align-items-center">' +
                    '<div class="ms-4">' +
                    '<p class="text-xs font-weight-bold mb-0">Commodity</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].cmdy_name + '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Total Freight </p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].tot_frgt_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Rail Share</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].tot_rail_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Balance</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].blnc_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Railable</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].railcble_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Railable (%)</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].railcble_shr_perc + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '<td>' +
                    '<div class="text-center">' +
                    '<p class="text-xs font-weight-bold mb-0">Non-Railable</p>' +
                    '<h6 class="text-sm mb-0">' + obj.Data[i].non_railble_shr + '</h6>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';

            }
            //  $("#loadingModal").modal('hide');

            htmlstr += '</tbody></table></div>';
            $("#DivCmdtWsIR").html(htmlstr);



        },
        error: function (xhr, status, error) {
            console.error("FetchCmdtSmry error:", status, error);
            // Handle error cases if needed
        }
    });
    return CmdtArray;
}



function drawZoneChart() {
    // alert("drawZoneChart function");
    // alert("drawZoneChart function ZnArray" +ZnArray);
    var data = new google.visualization.arrayToDataTable(ZnArray);

    var options = {
        width: '100%',
        height: '100%',
        legend: { position: 'none' },
        bar: { groupWidth: '75%' },
        isStacked: true,
        series: {
            0: { color: 'green' },
            1: { color: 'yellow' },
            2: { color: 'red' },
        },
        animation: {
            duration: 1000,
            easing: 'out',
        }
    };

    var chart = new google.charts.Bar(document.getElementById('CmdtCharts'));


    chart.draw(data, google.charts.Bar.convertOptions(options));

    google.visualization.events.addListener(chart, 'select', function () {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var selectedItem = selection[0];
            var zone = data.getValue(selectedItem.row, 0); // Get the year value
            FetchCmdtDt(zone);
        }
    });


}





function FetchGISSfmy() {
    var myurl = "/RailSAHAY/TeriDtJson";

    $.ajax({
        url: myurl,
        type: "POST",
        data: { Qry: 'TRY_GIS' },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log("FetchGISSfmy:", data);



var colorPalette = [
    "#ff0000", // red
    "#00ff00", // green
    "#0000ff", // blue
    "#ffff00", // yellow
    "#ff00ff", // magenta
    "#00ffff", // cyan
    "#ff7800", // orange
    "#8a2be2", // blue violet
    "#a52a2a", // brown
    "#deb887", // burly wood
    "#5f9ea0", // cadet blue
    "#7fff00", // chartreuse
    "#d2691e", // chocolate
    "#ff7f50", // coral
    "#6495ed", // cornflower blue
    "#dc143c", // crimson
    "#00fa9a"  // medium spring green
];

var col = -1;
function getcolor(){
    col = (col + 1) % colorPalette.length;
    return colorPalette[col];
}

var azn = L.geoJSON(allzn, {
    style: function (feature) {
        var color = getcolor();
        return {
            color: color,
            weight: 2,
            opacity: 1
        };
    },
    onEachFeature: function (feature, layer) {
        layer.on('mouseover', function () {
            layer.setStyle({
                color: 'black',
                weight: 3
            });
        });
        layer.on('mouseout', function () {
            layer.setStyle({
                color: layer.options.originalColor,
                weight: 2
            });
        });
        // Store the original color for use on mouseout
        layer.options.originalColor = layer.options.color;
    }
}).addTo(map);
            // Add GeoJSON layer to the map
            var geojsonLayer = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    showDtIR(feature);
                    // Customize marker here if needed
                    var rspctg = (Number(feature.properties.tot_rail_shr) * 100) / Number(feature.properties.tot_frgt_shr);
                    var Rndrspctg = rspctg.toFixed(2);
                    var rlblpctg = (Number(feature.properties.railcble_shr) * 100) / Number(feature.properties.tot_frgt_shr);
                    var Rndrlblpctg = rlblpctg.toFixed(2);
                    var nrlblpctg = (Number(feature.properties.non_railble_shr) * 100) / Number(feature.properties.tot_frgt_shr);
                    var Rndnrlblpctg = nrlblpctg.toFixed(2);
                    var crnthtml = '<div style="background-color:black; color:white; width:5vw;">' + feature.properties.zone_name + '</div>';
                    crnthtml += '<div style="background-color:red; display:flex; width:5vw; height:2vh;justify-content:space-between;">';
                    crnthtml += '<span class="scroll-animation" style="background-color:green; width:' + rspctg + '%;"></span>';
                    crnthtml += '<span class="scroll-animation" style="background-color:yellow; width:' + rlblpctg + '%;"></span>';
                    crnthtml += '<span class="scroll-animation" style="background-color:red; width:' + nrlblpctg + '%;"></span>';
                    crnthtml += '</div>';
                    var customIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: crnthtml,
                    });

                    var divMarker = L.marker(latlng, { icon: customIcon });

                    if (feature.properties && feature.properties.zone_name) {
                        divMarker.bindPopup("<table class='table table-striped table-bordered popup-table'><tr><td><span class='lbl'>Zone</span></td><td><span class='val'>" + feature.properties.zone_name + "</span></td></tr><tr><td><span class='lbl'>Total Rail Share</span></td><td><span class='val'>" + Rndrspctg + "</span></td></tr><tr><td><span class='lbl'><span>Railable Share</span></td><td><span class='val'>" + Rndrlblpctg + "</span></td></tr><tr><td><span class='lbl'>Non-Railable Share</span></td><td><span class='val'>" + Rndnrlblpctg + "</span></td></tr></table>");


                    }

                    divMarker.on('click', function () {
                        showZnWsDt(feature);
                        FetchCmdtDt(feature.properties.zone_name);
                    });

                    return divMarker;
                }
            }).addTo(map);



            var baseLayers = {
                "Bhuvan": bhuvan,
            };

            var overlays = {
                "Ind": geojsonLayer,
                "All Zone": azn ,
            };

            L.control.layers(baseLayers, overlays).addTo(map);
            // L.Control.geocoder().addTo(map);


        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", error);
            console.error("Response Text:", xhr.responseText);
        }
    });


}