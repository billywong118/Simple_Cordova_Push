var pushNotification;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    pushNotification = window.plugins.pushNotification;
    if ( device.platform == 'android' || device.platform == 'Android' )
    {
    pushNotification.register(
        successHandler,
        errorHandler, {
            "senderID":"replace_with_sender_id",
            "ecb":"onNotificationGCM"
        });
    }
}
// Android
function onNotificationGCM(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
 
    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            
            console.log("regID = " + e.regid);
        }
    break;
 
    case 'message':
        if ( e.foreground )
        {
            $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
            var my_media = new Media("/android_asset/www/"+e.soundname);
            my_media.play();
        }
        else
        { 
            if ( e.coldstart )
            {
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }
 
        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    break;
 
    case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;
 
    default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}
//- See more at: http://excellencemagentoblog.com/blog/2014/03/14/phonegap-3-0-integration-pushplugin-google-cloud-messaging/#sthash.O0E59q9b.dpuf