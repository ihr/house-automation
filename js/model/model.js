/**
 * Stores the status of room's sensors
 */

class Model {

    constructor(name, curtainsStatus, lightsStatus, temperature /*, lockStatus*/) {
        // Data
        this.name = name;
        this.curtainsStatus = curtainsStatus;
        this.lightsStatus = lightsStatus;
        this.temperature = temperature;
        //this.lockStatus = lockStatus; //Room lock example

        // Events
        this.onChange = new SmartDeviceEvent(this);
    }

    set(data) {

        switch (true) {
            case (data.event === 'lights-change'):
                data.value ? this.lightsStatus = 'on' : this.lightsStatus = 'off';
                break;
            case (data.event === 'curtains-change'):
                data.value ? this.curtainsStatus = 'open' : this.curtainsStatus = 'closed';
                break;
            //Room lock example
            /*case (data.event === 'lock-change'):
                data.value ? this.lockStatus = 'locked' : this.lockStatus = 'unlocked';
                break;
             */
            case (data.event === 'temperature-change'):
                this.temperature = data.value;
                break;

        }

        //Simulating persistence
        mockApi.persist(this, () => this.onChange.notify(this))
    }

}