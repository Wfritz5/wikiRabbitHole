export var EventBus = (function () {

    var eventCallbacksPairArray = [];
    var intf = {};

    intf.subscribe = function (eventType, callback) {
        var eventCallbacksPair = findEventCallbacksPair(eventType);

        if (eventCallbacksPair) {
            eventCallbacksPair.callbacks.push(callback);
        } else {
            eventCallbacksPairArray.push(new EventCallbacksPair(eventType, callback));
        }
    };

    intf.fire = function (eventType, args) {
        var eventCallbacksPair = findEventCallbacksPair(eventType);

        if (!eventCallbacksPair) {
            console.log('Error, no listeners for ', eventType, ', event!');
            return;
        }

        eventCallbacksPair.callbacks.forEach(function (callback) {
            callback(args);
        });
    };

    var findEventCallbacksPair = function (eventType) {
        return eventCallbacksPairArray.find(function (eventObject) {
            return eventObject.eventType === eventType;
        });
    };

    var EventCallbacksPair = function (eventType, callback) {
        this.eventType = eventType;
        this.callbacks = [callback];
    };

    return intf;
})();