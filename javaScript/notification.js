Notification.requestPermission(function(result) {
  if(result === 'granted') {
    console.log("通知が許可されています");
  }
  else if(result === 'denied'){
    console.log("通知が拒否されています");
  }
  else if(result === 'default'){}
});
