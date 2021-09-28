// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function loadTmpl(tmplUrl, dataUrl, container) {
    $.ajax({
        type: "POST",
        url: dataUrl,
        data: { Name: "Index" },
        cache: false,
        success: function (data) {
            if (data) {
                //console.log(data);
                $(container).empty();
                $.get(
                    tmplUrl,
                    function (rowData) {
                        //console.log(rowData);
                        $.template("body", rowData);
                        $.tmpl("body", data).appendTo(container);
                    }
                );
            }
        }
    });
}

function postDataBack(actionUrl, data, yourAction) {

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: data,
        cache: false,
        success: function (data) {
            if (data) {
                yourAction(data);
            }
        }
    });
}

function deleteUserById(id) {
    var userId = $("#userId").val();
    if (userId == id) {
        $.alerts.alert("Alert","You are not allowed to delete yourself!",null);
        return;
    }
    $.alerts.confirm("Confirm Again","Are you sure to delete this user?", (result)=>{
        
        if(result)
        {
            postDataBack("/home/DeleteUser", {id:id},()=>{ 
                loadTmpl("/tmpl/data.html","/home/GetAllUser","#tableBody");
            });
        }
    });
}

function showEditPage(id)
{
    var userId = $("#userId").val();
    if (userId == id) {
        $.alerts.alert("Alert","You are not allowed to edit yourself!",null);
        return;
    }
    renderEditPage();
    postDataBack("/home/GetUserById", {id:id}, (data)=>{
        $("#firstName").val(data.firstName);
        $("#lastName").val(data.lastName);
        $("#address").val(data.address);
        $("#telePhone").val(data.telePhone);
        $("#email").val(data.email);
        renderEditUser(data);
    });
}
function saveUpdate()
{ 
    $.alerts.confirm("Confirm Again","Are you sure to update this user?", (result)=>{
            
        if(result)
        {

            postDataBack("/home/UpdateUser", 
            {   userId:$("#editUserId").val(),
                firstName:$("#firstName").val(),
                lastName:$("#lastName").val(),
                address:$("#address").val(),
                telePhone:$("#telePhone").val(),
                email:$("#email").val()
            }, 
            (data)=>{
                removeBottom()
                showTable();
            });
        }
    });
}
