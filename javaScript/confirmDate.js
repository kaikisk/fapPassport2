var today = new Date();

setInterval(function(){
    var appointmentsString = localStorage.getItem('appointments');
    var appointments = JSON.parse(appointmentsString);
    console.log(localStorage.getItem('appointments'));
    console.log('年:' + today.getFullYear() + ', 月：'+ (today.getMonth()+1) + ', 日：' + today.getDate());
    
    for(var i = 0; i < appointments.length; i++){
        var date = appointments[i].dateClient.split('-');
        console.log('分割' +date.join(' & '));
        if(today.getFullYear() == date[0] && (today.getMonth()+1) == date[1] 
            && today.getDate() == date[2]){
                navigator.serviceWorker.ready.then(function(registration){
                    registration.showNotification('1日前だよ');
                });
                //下の書き方はなぜかスマホに対応してない
               //var n = new Notification('1日前です',appointments[i].dateClient);
               //setTimeout(n.close.bind(n), 20000); 
        }
    }
}, 10000);
//86400000mm = 1日
