/**
 * This is the entry point to the app
 */

//A class to provide for observable objects
class SmartDeviceEvent {
    constructor(sender) {
        this.sender = sender;
        this.listeners = [];
    }

    attach(listener) {
        this.listeners.push(listener);
    }

    notify(args) {
        this.listeners.forEach(listener => listener(this.sender, args));
    }

}

let mockApi = new MockApi();


mockApi.init().done(() => {

    $(() => {
        //DOM is ready, so let's populate it
        if (!window.location.href.endsWith('#')) {
            if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Safari')) {
                window.location.href += '?#';
            } else if(navigator.userAgent.includes('Firefox')) {
                window.location.href += '#';
            }
        }

        //1st check that we have something to show
        if (!mockApi.rooms || mockApi.rooms.length === 0) {
            //There are no rooms
            $('#rooms').html('No rooms found');
        }

        //2nd convert the data to JS room representation Model class
        let models = mockApi.rooms.map(room => new Model(room.name, room.curtainsStatus, room.lightsStatus,
            room.temperature /*, room.lockStatus */));
        //3rd build the Control views
        let controlViews = models.map(roomModel => new ControlView(roomModel, mockApi.controlViewHtmlTemplate));
        //4th build the Status views
        let statusViews = models.map(roomModel => new StatusView(roomModel, mockApi.statusViewHtmlTemplate));

        //5th Bridge each room model to a Control and Status view via 1 Controller instance
        models.forEach((model, index) => {
            let controlView = controlViews[index];
            new Controller(model, controlView, statusViews[index]);
            controlView.appendToDOM();
            controlView.bindEventListeners();
        });

        //6th Needed to initialise the MDL components, especially for Firefox
        componentHandler.upgradeDom();
    });
});
