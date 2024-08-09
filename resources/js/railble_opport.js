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
    FetchZnSmry();
    FetchTopznl();
    FetchCmdtSmry();
   // drawZoneChart();
});

  function showResMod(zone)
{
    $("#loadingModal").modal('show');
    alert("zone :" +zone);
}


function FetchTopznl() {
//alert("topzn"+topzn);
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

    

            var obj = topzn; // No need to parse if dataType is "json"
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
            $("#divAlZnDt").html(htmlstr);         
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
 }

function FetchCmdtDt(ZoneName) {
    $('#DivCmdtWsIR').hide();

    if(ZoneName=="")
       $("#comdta").text("Commodity-wise Share (IR)");
    else
       $("#comdta").text("Commodity-wise Share ("+ZoneName+")");

   //alert("ZoneName..."+ ZoneName);
            var data=ggdfg;
            var htmlstr = '<div class="table-responsive">' +
                '<table class="table align-items-center">' +
                '<tbody>';

            for (var i = 0; i < data.Data.length; i++) {
                var item = data.Data[i];
                var accordionId = 'accordion-' + i;
                //alert("ZoneName...IN"+ ZoneName);
                if(item.zone_name==ZoneName)
                {
                    //alert("ZoneName...condtion"+ ZoneName);
                
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
            }

            htmlstr += '</tbody></table></div>';
            $("#DivCmdtWs").html(htmlstr);

            // Add event listener for accordion behavior
            $('.collapse').on('show.bs.collapse', function () {
                $('.collapse.show').collapse('hide');
            });

            //console.log("FetchCmdtDt htmlstr" + htmlstr);
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
    //alert("fchznsmry"+fchznsmry);
   
            //console.log("FetchZnSmry success:", data);
            // Process your data here as needed

            ZnArray = [['Zone', 'Total Rail Share', 'Railable Share', 'Non-Railable Share', { role: 'annotation' }]];

            fchznsmry.Data.forEach(function (item) {
                if (item.zone_name == "G.TOTAL") { return; }


                ZnArray.push([item.zone_name, parseFloat(item.tot_rail_shr), parseFloat(item.railcble_shr), parseFloat(item.non_railble_shr), '']);


            });
            //$("#loadingModal").modal('hide');
            //console.log("ZnArray-:" + ZnArray);

        }



var CmdtArray = [];
function FetchCmdtSmry() {
   //alert("fetcmdtsmry"+fetcmdtsmry);

            CmdtArray = [['Commodity', 'Total Rail Share', 'Railable Share', 'Non-Railable Share', { role: 'annotation' }]];

            fetcmdtsmry.Data.forEach(function (item) {
                if (item.cmdy_name == "G.TOTAL") { return; }
                CmdtArray.push([item.cmdy_name, parseFloat(item.tot_rail_shr), parseFloat(item.railcble_shr), parseFloat(item.non_railble_shr), '']);
            });

            //console.log("CmdtArray Before-:" + CmdtArray);
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
            //console.log("CmdtArray After-:" + CmdtArray);



            var htmlstr = '<div class="table-responsive">' +
                '<table class="table align-items-center">' +
                '<tbody>';

            var obj = fetcmdtsmry; // No need to parse if dataType is "json"

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







    