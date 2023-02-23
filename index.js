var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stuDBName="SCHOOL-DB";
var stuRelationName="STUDENT-TABLE";
var connToken = "90932529|-31949277108291564|90949231";
$("roll").focus();
function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);

}
function getStuIdAsJsonObj(){
    var roll = $('#roll').val();
    var jsonStr={
         id : roll
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.Full_Name);
    $('#stuclass').val(record.Class);
    $('#dob').val(record.Birth_Date);
    $('#address').val(record.Address);
    $('#enroll').val(record.Enrollment_Date);
}
function resetForm(){
    $('#roll').val(" ");
    $('#fullname').val(" ");
    $('#stuclass').val(" ");
    $('#dob').val(" ");
    $('#address').val(" ");
    $('#enroll').val(" ");
    $('#roll').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#roll').focus("");
}
function validateData(){
    var roll, fullname, stuclass, dob, address, enroll;
    roll= $('#roll').val();
    fullname=$('#fullname').val();
    stuclass=$('#stuclass').val();
    dob =$('#dob').val();
    address=$('#address').val();
    enroll=$('#enroll').val();
    if(roll===' '){
        alert('Student Roll-No is missing');
        $('#roll').focus();
        return "";
    }
    if (fullname===""){
        alert('Student name is missing');
        $('#fullname').focus();
        return "";
    }
    if (stuclass===""){
        alert('Student class is missing');
        $('#stuclass').focus();
        return "";
    }
    if (dob===""){
        alert('Student Birth-Date is missing');
        $('#dob').focus();
        return "";
    }
    if (address===""){
        alert('Student address is missing');
        $('#address').focus();
        return "";
    }
    if (enroll===""){
        alert('Student Enrollment-Date is missing');
        $('#enroll').focus();
        return "";
    }
    var jsonStrObj = {
        id :roll,
        Full_Name:fullname,
        Class:stuclass,
        Birth_Date:dob,
        Address:address,
        Enrollment_Date:enroll
    };
    return JSON.stringify(jsonStrObj);

}
function getStu(){
    var stuIdJsonObj =getStuIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,stuIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    if(resJsonObj.status === 400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();

    }else if(resJsonObj.status === 200){
        $('#roll').prop('disabled',true);
        fillData(resJsonObj);
        $('#change').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fullname').focus();
    }


}
function saveData(){
    var jsonStrObj= validateData();
    if(jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsobObj = executeCommandAtGivenBaseUrl (putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#roll').focus();
    
}
function changeData(){
    $('#change').prop('disabled',true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName,stuRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#roll").focus();
}
