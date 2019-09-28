/**
 * Mocks API to the backend
 */

class MockApi {
    constructor() {
        this.rooms = null;
        this.controlViewHtmlTemplate = null;
        this.statusViewHtmlTemplate = null;
    }

    //1. Get the HTML Template for the control panel views
    //2. Get the HTML Template for the status panel views
    //3. Get the list of rooms to populate the place
    init() {
        $.get('static/control_view_template.html').done(function (data) {
            mockApi.controlViewHtmlTemplate = data;
        });

        $.get('static/status_view_template.html').done(function (data) {
            mockApi.statusViewHtmlTemplate = data;
        });

        return $.get('backend/data.json').done(function (data) {
            mockApi.rooms = data;
        });
    }

    persist(data, whenPersisted, latency = 400) {
        //Simulating a REST request with 400ms latency
        setTimeout(whenPersisted, latency);
    }
}