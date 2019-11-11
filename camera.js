var imageCapture;
var tempImage;
var width = $(".video").width();
var height = $(".video").height();
var video = document.getElementById("myVideo"); // 適当にvideoタグのオブジェクトを取得
var constrains = { video:{facingMode: "environment", width: width, height: height}, audio: false }; // 映像・音声を取得するかの設定, リアカメラ設定

navigator.mediaDevices.getUserMedia(constrains)
    .then(gotStream).catch(function (err) {
        console.log("An error occured! " + err);
    });

function gotStream(stream) {
    video.srcObject = stream; // streamはユーザーのカメラとマイクの情報で、これをvideoの入力ソースにする

    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
}


function takePhoto() {
    var photo = {}
    photo.width = width;
    photo.height = height;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //videoの縦幅横幅を取得
    var w = video.offsetWidth;
    var h = video.offsetHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    ctx.drawImage(video, 0, 0, w, h);
    var img = canvas.toDataURL('image/jpeg');
    console.log(img);
    $(".video").html('<canvas id="canvas1"></canvas>');
    var canvas1 = document.getElementById('canvas1');
    canvas1.width = w;
    canvas1.height = h;
    var ctx1 = canvas1.getContext('2d');
    var img1 = new Image();
    img1.onload = function () {
        ctx1.drawImage(img1, 0, 0); // Or at whatever offset you like
    };
    img1.src = img;
    $('#btn_update').html('<button class="btn-square-shadow btn_fifty green_color" id="ok">OK</button>'
        + '<button class="btn-square-shadow btn_fifty green_color" id="cancel">取り直し</button>');
    $("#ok").click(() => {
        getData("tempResult").then(clt => {
            var clt1 = JSON.parse(clt);
            photo.photoIndex = clt1.photoIndex;
            console.log("photo index: " + photo.photoIndex);
            photo.img = img;
            saveImg(photo).then(() => {
                console.log("写真を保存しました");
                location.href = "previewPhoto.html";
            }).catch(err => alert(err));
        }).catch(err => console.log(err));


    });
    $("#cancel").click(() => {
        $(".video").html('<video class="myVideo" id="myVideo" width="720" autoplay="1"></video>'
            + '<script type="text/javascript" src="camera.js"></script>'
            + '<canvas id="canvas" style="display:none;"></canvas>');
        $('#btn_update').html('<button id="takePhoto" class="btn-square-shadow btn_center green_color" onclick="takePhoto()">写真撮影</button>');
        navigator.mediaDevices.getUserMedia(constrains)
            .then(gotStream).catch(function (err) {
                console.log("An error occured! " + err);
            });
    });
}

function saveImg(val) {
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("indexedDB.open pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["photo"], "readwrite");
            var store = ts.objectStore("photo");
            var request = store.add(val);
            request.onsuccess = function (event) {
                resolve("success put img");
            }
            request.onerror = function (event) {
                reject("エラーが発生しました。");
            }
        }
        request.onerror = function () {
            console.log("indexedDBを開くのに失敗しました");
        }
    });
}