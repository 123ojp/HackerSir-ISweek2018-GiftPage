document.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>");
var NID;
var HOST = "http://35.201.187.227:5000"; //結尾不要/
function checknid(NID1) {
    if (NID1.length == 9 || NID1.length == 7) {
        NID = NID1.substring(0, NID1.length - 1);
    }
    re1 = /^[dempDEMP]{1}0[0-9]{6}$/;
    re2 = /^[tT][0-9]{5}$/
    if (re1.test(NID) || re2.test(NID)) {
        return true;
    } else {
        return false;
    }
}

function read_stage(NID) {
    $.ajax({
        type: "post",
        data: {
            "username": NID,
        },
        url: HOST + "/know/read", // 填入網路應用程式網址
        success: function(e) {
            if (e == "nodata") {
                document.getElementById("RPG_STAGE").innerHTML = e;
            } else {
                document.getElementById("RPG_STAGE").innerHTML = temp;
            }
        }
    });
}



$(document).ready(function() {
    $(".Question_page").each(function(index, item) {
        $(item).hide();
    })
});

$("#start_btn").click(function() {
    NID = document.getElementById("input_nid").value;
    if (checknid(NID)) {
        $("#start_div").hide();
        $("#timer").show();
        $("#score").show();
        $("#Q1").show();
        reorder();
    } else {
        alert("NID格式錯誤");
        $("#start_div").show();
    }

});
$('#input_nid').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        NID = document.getElementById("input_nid").value;
        if (checknid(NID)) {
            $("#start_div").hide();
            $("#timer").show();
            $("#score").show();
            $("#Q1").show();
            reorder();
        } else {
            alert("NID格式錯誤");
            $("#start_div").show();
        }
    }
});

function startOAO() {
    NID = document.getElementById("input_nid").value;
    if (checknid(NID)) {
        timmerr.start()
        $("#start_div").hide();
        $("#timer").show();
        $("#score").show();
        $("#Q1").show();
        reorder();
    } else {
        alert("NID格式錯誤");
    }

}

function reorder() {
    read_gift(NID);
    read_gift1(NID);
    document.getElementById("NIDshow").innerHTML = NID;

}

function RPG_post() {
    write_gift(NID);
}

function Fast_post() {
    write_gift1(NID);
}

function redo() {

    document.getElementById("input_nid").value = "";
    $(".Question_page").each(function(index, item) {
        $(item).hide();
    })
    $("#start_div").show();
    document.getElementById("RPG_STAGE").innerHTML = "";
    document.getElementById("q1_ans_0").value = "載入中";
    document.getElementById("ASK_right").innerHTML = "";
    document.getElementById("q1_ans_1").value = "載入中";
}

function read_gift(NID) {
    $.ajax({
        type: "post",
        data: {
            "username": NID,
        },
        url: HOST + "/know/read",
        success: function(e) {

            document.getElementById("q1_ans_0").value = e;


        }
    });
}

function write_gift(NID) {
    $.ajax({
        type: "post",
        data: {
            "username": NID,
        },
        url: HOST + "/know/write",
        success: function(e) {
            alert(e);
            read_gift(NID);
        }
    });
}

function read_gift1(NID) {
    $.ajax({
        type: "post",
        data: {
            "username": NID,
        },
        url: HOST + "/rpg/read",
        success: function(e) {

            document.getElementById("q1_ans_1").value = e;

        }
    });
}

function write_gift1(NID) {
    $.ajax({
        type: "post",
        data: {
            "username": NID,
        },
        url: HOST + "/rpg/write",
        success: function(e) {
            alert(e);
            read_gift1(NID);
        }
    });
}
