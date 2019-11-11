var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

if (indexedDB) {
    // データベースを削除したい場合はコメントを外します。
    //indexedDB.deleteDatabase("mydb");
    var openRequest = indexedDB.open("fapPassport");

    openRequest.onupgradeneeded = function (event) {
        // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
        console.dir(event);
        db = event.target.result;
        var store = db.createObjectStore("fapPass", { keyPath: "id" });
        store.createIndex("myvalueIndex", "myvalue");
        console.log("pass onupgradeneeded");
        var store1 = db.createObjectStore("photo", {keyPath: "id"});
        store1.createIndex("myvalueIndex", "myvalue");
    }


    openRequest.onsuccess = function (event) {
        db = event.target.result;
        // console.log("pass onsuccess");
        // console.dir("db: " + db);
    }
} else {
    window.alert("このブラウザではIndexed DataBase API は使えません。");
}