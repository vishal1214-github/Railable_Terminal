var GG_CMDTLIST=[];
var GG_RLBLDATA=[];
function fetchCmdtList()
{
     var myurl="/RailSAHAY/BDUUntpRlblOptyJson";
     $.ajax({
     url : myurl,
     type : "post",
     data: {Optn:'CMDT_LIST'},
     async : true,
     success : function(data) {
            var obj= JSON.parse(data);
            var stts=obj.Stts;
            var cntr=0;
            var rfndacnt=0;
            if(stts=="S")
            {
		for(var i=0;i<obj.DataList.length;i++)
	        {
			GG_CMDTLIST[i]=new Array(2);
			GG_CMDTLIST[i][0]=obj.DataList[i].Code;
			GG_CMDTLIST[i][1]=obj.DataList[i].Name;
		}
		return;
            }
            else
            {
                failedToast("Failed to Fetch List of Commodities"+obj.ErorMesg);
            }
	}
	});
}
function delRecord(delitem,rowid)
{
	$(delitem).closest('tr').addClass("selected-row");
	if(rowid=="")
	{
		return false;
	}
    if (confirm('This action will delete the selected record! Do you wish to continue ?'))
    {
		 var myurl="/RailSAHAY/BDUUntpRlblOptyJson";
		 $.ajax({
		 url : myurl,
		 type : "post",
		 data: {Optn:'DEL_DATA', RowId:rowid},
		 async : true,
		 success : function(data) {
			var obj= JSON.parse(data);
			var stts=obj.Stts;
			var cntr=0;
			var rfndacnt=0;
			if(stts=="S")
			{
				successToast("Record Deleted Successfully");
				refreshData();
				return;
			}
			else
			{
			failedToast("Failed to Delete the record: "+obj.ErorMesg);
			}
		}
		});
	}
	else
	{
		return false;
	}
}
function saveData()
{
     var zone=$("#selZone").val();
     var dvsn='';
     var year=$("#selYear").val();
     var cmdt=$("#selCmdt").val();
     var totlshr=$("#txtTotlShr").val();
     var railshr=$("#txtRailShr").val();
     var blncshr=$("#txtBlncShr").val();
     var rlblshr=$("#txtRlblShr").val();
     var nonrlblshr=$("#txtNonRlblShr").val();
     var resn=$("#txtResn").val();
     var rowid=$("#txtRowId").val();
     var railcoef=$("#txtRailCoef").val();
	 /*validations*/
	 if(cmdt=="")
	 {
		 alert("Please select a commodity to proceed");
		 return false;
	 }
	 if(railshr!="")
	 {
		if(totlshr=="")
		{
			alert("Total Freight Share can not be left blank");
			return false;
		}
		else
		{
			if(Number(railshr)>Number(totlshr))
			{
				alert("Rail Share can not be greater than Total Freight Share");
				return false;
			}
		}
	 }
	 if(blncshr!="")
	 {
		if(totlshr=="")
		{
			alert("Total Freight Share can not be left blank");
			return false;
		}
		else
		{
			if(Number(blncshr)>Number(totlshr))
			{
				alert("Balance Share can not be greater than Total Freight Share");
				return false;
			}
		}
	 }
	 if(rlblshr!="")
	 {
		if(totlshr=="")
		{
			alert("Total Freight Share can not be left blank");
			return false;
		}
		else
		{
			if(Number(rlblshr)>Number(totlshr))
			{
				alert("Railable Share can not be greater than Total Freight Share");
				return false;
			}
		}
	 }
	 if(nonrlblshr!="")
	 {
		if(totlshr=="")
		{
			alert("Total Freight Share can not be left blank");
			return false;
		}
		else
		{
			if(Number(nonrlblshr)>Number(totlshr))
			{
				alert("Non-Railable Share can not be greater than Total Freight Share");
				return false;
			}
		}
	 }
     var myurl="/RailSAHAY/BDUUntpRlblOptyJson";
     $.ajax({
     url : myurl,
     type : "post",
     data: {Optn:'SAVE_DATA', Year:year, Zone:zone, Dvsn:dvsn, Cmdt:cmdt, TotlShr:totlshr, RailShr:railshr, BlncShr: blncshr, RailCoef:railcoef, RlblShr:rlblshr, NonRlblShr: nonrlblshr, Resn:resn, RowId:rowid},
     async : true,
     success : function(data) {
	    var obj= JSON.parse(data);
	    var stts=obj.Stts;
	    var cntr=0;
	    var rfndacnt=0;
	    if(stts=="S")
	    {
	    	successToast("Record Saved Successfully");
	    	refreshData();
	    	return;
	    }
	    else
	    {
		failedToast("Failed: "+obj.ErorMesg);
	    }
	}
	});
}

function fetchData()
{
     var year=$("#selYear").val();
     var zone=$("#selZone").val();
     var dvsn='';

     var htmlstr='<table class="table table-data table-striped table-bordered"><thead><tr><th style="width:150px;">Commodity</th><th>Total Freight Market- All modes (in MT)</th><th>Rail Share (in MT)</th><th>Balance Share (in MT)</th><th>Railable Share (in MT)</th><th>Rail Coefficient (%)</th><th>Non-Railable Share (in MT)</th><th>Reason for Non-Railable</th><th>&nbsp;</th></tr></thead><tbody>';
     var myurl="/RailSAHAY/BDUUntpRlblOptyJson";
     $.ajax({
     url : myurl,
     type : "post",
     data: {Optn:'FETCH_DATA', Year:year,Zone:zone,Dvsn:dvsn},
     async : true,
     success : function(data) {
	    var obj= JSON.parse(data);
	    var stts=obj.Stts;
	    if(stts=="S")
	    {
	    	for(var i=0;i<obj.DataList.length;i++)
			{
				GG_RLBLDATA[i]=new Array(13);
				var year=obj.DataList[i].Val1;
				var zone=obj.DataList[i].Val2;
				var dvsn=obj.DataList[i].Val3;
				var cmdtcode=obj.DataList[i].Val4;
				var cmdtname=obj.DataList[i].Val5;
				var totlshr=obj.DataList[i].Val6;
				var railshr=obj.DataList[i].Val7;
				var blncshr=obj.DataList[i].Val8;
				var rlblshr=obj.DataList[i].Val9;
				var railcoef=obj.DataList[i].Val10;
				var nonrlblshr=obj.DataList[i].Val11;
				var resn=obj.DataList[i].Val12;
				var rowid=obj.DataList[i].Val13;
				GG_RLBLDATA[i][0]=year;
				GG_RLBLDATA[i][1]=zone;
				GG_RLBLDATA[i][2]=dvsn;
				GG_RLBLDATA[i][3]=cmdtcode;
				GG_RLBLDATA[i][4]=cmdtname;
				GG_RLBLDATA[i][5]=totlshr;
				GG_RLBLDATA[i][6]=railshr;
				GG_RLBLDATA[i][7]=blncshr;
				GG_RLBLDATA[i][8]=rlblshr;
				GG_RLBLDATA[i][9]=railcoef;
				GG_RLBLDATA[i][10]=nonrlblshr;
				GG_RLBLDATA[i][11]=resn;
				GG_RLBLDATA[i][12]=rowid;
				var cmdtclss=" done";
				if((totlshr=="")|| (railshr=="") || (blncshr=="")|| (rlblshr=="") || (nonrlblshr==""))
					cmdtclss=" pndg";

				if(rowid=="")
					htmlstr+='<tr><td class="cmdt'+cmdtclss+'">'+cmdtname+'</td><td class="text-center">'+totlshr+'</td><td class="text-center">'+railshr+'</td><td class="text-center">'+blncshr+'</td><td class="text-center">'+rlblshr+'</td><td class="text-center">'+railcoef+'</td><td class="text-center">'+nonrlblshr+'</td><td>'+resn+'</td><td class="text-center"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-light btn-edit" onclick="editRecord('+i+',\''+rowid+'\');"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></div></td></tr>';
				else
					htmlstr+='<tr><td class="cmdt'+cmdtclss+'">'+cmdtname+'</td><td class="text-center">'+totlshr+'</td><td class="text-center">'+railshr+'</td><td class="text-center">'+blncshr+'</td><td class="text-center">'+rlblshr+'</td><td class="text-center">'+railcoef+'</td><td class="text-center">'+nonrlblshr+'</td><td>'+resn+'</td><td class="text-center"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-light btn-edit" onclick="editRecord('+i+',\''+rowid+'\');"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button type="button" class="btn btn-light btn-edit" onclick="delRecord(this,\''+rowid+'\');"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></td></tr>';
			}
			htmlstr+='</tbody>';
			htmlstr+='<tfoot>';
			htmlstr+='<tr><td colspan="13">';
			htmlstr+='<a class="btn-add-row shtw" data-toggle="modal" data-target="#loginModal" onclick="addRecord();return true;"><i class="fa fa-plus"></i>';
			htmlstr+='</a>';
			htmlstr+='</tfoot></table>';
			$("#divRlblData").html(htmlstr);
	    }
	    else
	    {
		failedToast("Failed to fetch the data: "+obj.ErorMesg);
	    }
	}
	});
}
function addRecord()
{
	var content='';
	$("#divMesg").removeClass();
	$("#divMesg").html('');
	var year=$("#selYear").val();
	content='<div class="form-title text-center">';
	content+='<p class="tab-head-caption"><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;&nbsp;Untapped Loading/Unloading Opportunity '+year+'</p>';
	content+='</div>';
	content+='<div class="d-flex flex-column text-center" id="divInptForm">';
	content+='<form>';
	content+='<div class="row">';
	content+='<div class="col-lg-4 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Commodity</label><select id="selCmdt" class="form-control"></select>';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-4 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Total Freight Share-All modes of transportation (in Million Tonnes)</label><input type="number" class="form-control" id="txtTotlShr" onpaste="return false;" min="0" onchange="calcRailCoef();" />';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-4 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Railway Share (in Million Tonnes)</label><input type="number" class="form-control" id="txtRailShr" onpaste="return false;" min="0"  onchange="calcRailCoef();" />';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-3 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Balance Share (in Million Tonnes)</label><input type="number" class="form-control" id="txtBlncShr" style="font-weight:600;" readonly onpaste="return false;" min="0"  onchange="calcNonRlbl();" />';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-3 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Railable Share (in Million Tonnes)</label><input type="number" class="form-control" id="txtRlblShr" onpaste="return false;" min="0"  onchange="calcNonRlbl();"  />';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-3 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Rail Coefficient (%)</label><input type="number" readOnly class="form-control" id="txtRailCoef" style="font-weight:600;"  onpaste="return false;" min="0" />';
	content+='</div>';
	content+='</div>';
	content+='<div class="col-lg-3 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Non-Railable Share (in Million Tonnes)</label><input type="number" class="form-control" id="txtNonRlblShr"  style="font-weight:600;" onpaste="return false;" readOnly min="0" /><p class="p-help">*Difference of Balance Share and Railable Share</p>';
	content+='</div>';
	content+='</div><hr style="margin:5px;" />';
	content+='<div class="col-lg-12 col-sm-12">';
	content+='<div class="form-group">';
	content+='<label>Reason for Non-Railable</label><textarea id="txtResn" class="form-control" maxlength="500" placeholder="Maximum 500 Characters" style="border-radius:0px;" rows="4"></textarea>';
	content+='</div>';
	content+='</div></div>';
	content+='<input type="hidden" id="txtRowId" name="txtRowId" />';
	content+='<div class="btn-group">';
	content+='<button type="button" class="button-5" onclick="saveData();">Save & Add More</button>';
	content+='</div>';
	content+='</form>';
	content+='</div>';
	$("#divAddRecord").html(content);
	
	const textArea = document.getElementById('txtResn');
        const allowedChars = /^[\dA-Za-z\s.,@+\-_()#=\[\]]+$/;

        textArea.addEventListener('input', function (event) {
        	const cursorPosition = this.selectionStart;
	        let value = this.value;
        	if (!allowedChars.test(value)) {
	          this.value = value.replace(/[^0-9a-zA-Z\s.,@+\-_()#=\[\]]+/g, ' ');
        	  this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
	        }
	});

        textArea.addEventListener('paste', function (event) {
        	event.preventDefault();
                let paste = (event.clipboardData || window.clipboardData).getData('text');
                paste = paste.replace(/[^0-9a-zA-Z\s.,@+\-_()#\[\]]+/g, '');
                document.execCommand('insertText', false, paste);
        });
	populateLOV($("#selCmdt"));

	$("#loginModal").modal('show');
	$('#loginModal').on('hidden.bs.modal', function () {
		$(".table-input>tr").removeClass("selected-row");
		$("tr").removeClass("selected-row");
	});

}
function calcRailCoef()
{
	var totl=$("#txtTotlShr").val();
	var railshr=$("#txtRailShr").val();
	if((totl=="") || (railshr==""))
	{
		$("#txtRailCoef").val("");
		$("#txtBlncShr").val("");
		return;
	}
	else
	{
		var railcoef=Math.round(((Number(railshr)*100)/Number(totl))*10)/10;
		$("#txtRailCoef").val(railcoef);
		var blncshr=Number(totl)-Number(railshr);
		$("#txtBlncShr").val(blncshr);
		return;
	}
}
function calcNonRlbl()
{

	var blncshr=$("#txtBlncShr").val();
	var rlblshr=$("#txtRlblShr").val();
	if((blncshr=="") || (rlblshr==""))
	{
		$("#txtNonRlblShr").val("");
		return;
	}
	else
	{
		var nonrlbl=Number(blncshr)-Number(rlblshr);
		$("#txtNonRlblShr").val(nonrlbl);
		return;
	}
}
function populateLOV(in_obj)
{
	$(in_obj).find('option').remove().end();
		$(in_obj).append($('<option>', {
	   		value: '',
		   	text: 'Select Commodity'
		}));

	for(var i=0;i<GG_CMDTLIST.length;i++)
	{
		$(in_obj).append($('<option>', {
				value: GG_CMDTLIST[i][0],
				text: GG_CMDTLIST[i][1]
		}));
	}
}
function editRecord(indx,rowid)
{
	addRecord();
	$("#selCmdt").find("option[value='"+GG_RLBLDATA[indx][3]+"']").prop("selected", "selected");
	$("#txtTotlShr").val(GG_RLBLDATA[indx][5]);
	$("#txtRailShr").val(GG_RLBLDATA[indx][6]);
	$("#txtBlncShr").val(GG_RLBLDATA[indx][7]);
	$("#txtRlblShr").val(GG_RLBLDATA[indx][8]);
	$("#txtRailCoef").val(GG_RLBLDATA[indx][9]);
	$("#txtNonRlblShr").val(GG_RLBLDATA[indx][10]);
	$("#txtResn").val(GG_RLBLDATA[indx][11]);
	$("#txtRowId").val(rowid);
}
function refreshData()
{
	fetchData();
}
$(document).ready(function(){
	fetchCmdtList();
	refreshData();
            
});