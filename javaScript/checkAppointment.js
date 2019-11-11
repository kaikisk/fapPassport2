var appointments;
$(function () {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        appointments = JSON.parse(ap);
        for (var i = 0; i < appointments.length; i++) {
            console.log(i + " : " + appointments[i])
            $('#Table1').append('<tr id=table' + i + '><td>' + appointments[i].dateClient +
                '</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].detailClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickRegister(' + i + ')">更新</button>'
                + '<button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult(' + i + ')">結果</button>'
                + '<button type="button" class="btn-square-shadow btn_delAndup" onclick="deleteAppointment(' + i + ')">削除</button></td></tr>');
        }
    }).catch(err => console.log("検診予約が登録されていません"));
})



function clickRegister(index) {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        var appointments = JSON.parse(ap);
        var target = appointments[index];
        $('#txtDate').val(target.dateClient);
        $('#txtdetail').val(target.detailClient);
        $('select[name="type"]').val(target.valClient);
        $('#btn_update').html('<button class="btn-square-shadow btn_fifty green_color" id="update">更新</button>'
            + '<button class="btn-square-shadow btn_fifty yellow_color" id="cancel">キャンセル</button>');
        $('#update').click(() => {
            target.dateClient = $('#txtDate').val();
            target.detailClient = $('#txtdetail').val();

            for (var i = 1; i <= 7; i++) {
                if (document.getElementById("RblExamination" + i).selected) {
                    target.valClient = $('#RblExamination' + i).val();
                    break;
                }
            }

            console.dir()
            appointments[index] = target;
            var temp = JSON.stringify(appointments);
            console.log(temp);
            saveAppointment(temp).then(() => {
                resetElement();
                $('#table' + index).html('<td>' + appointments[index].dateClient +
                    '</td><td>' + appointments[index].valClient + '</td><td>' + appointments[index].detailClient
                    + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickRegister(' + index + ')">更新</button>'
                    + '<button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult(' + index + ')">結果</button>'
                    + '<button type="button" class="btn-square-shadow btn_delAndup" onclick="deleteAppointment(' + index + ')">削除</button></td></tr>');
                console.log("更新が成功しました");
            }).catch(err => console.error("更新が失敗しました"));
        });
        $('#cancel').click(() => {
            resetElement();
            $('#btn_update').html('<button class="btn-square-shadow btn_center green_color" id="submit" onclick="appointmentRegistration()">登録</button>');
            return;
        })
    }).catch(err => console.error(err));
}

function clickResult(index) {
    var appointment = getData("appointments");
    appointment.then(ap => {
        var appointments = JSON.parse(ap);
        var target = appointments[index];
        var resultPage = "result.html" + "?date=" + target.dateClient
            + "&detail=" + target.detailClient + "&val=" + target.valClient
            + "&Aindex=" + index;

        resultPage = encodeURI(resultPage);
        location.href = resultPage;
    }).catch((err) => alert(err));
}

function resetElement() {
    $('#txtDate').val("");
    $('#txtdetail').val("");
    $('select[name="type"]').val("");
}