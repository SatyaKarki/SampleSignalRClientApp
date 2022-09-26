"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:39823/events-hub"
    , {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect() //when server get disconnects it reconnect with the serevr
    .configureLogging(signalR.LogLevel.Information)
    .build();
connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

//Receiving message
connection.on("receiveEvent", function (message) {
    if (message.nodeEventType.includes("Stratis.Bitcoin.EventBus.CoreEvents.BlockConnected")) {
        if (message.height) {
            document.getElementById('lblHeight').innerHTML = ` ${message.height}`;
        }
    }
})