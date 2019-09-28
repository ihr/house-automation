/**
 * Controls the smart devices in the room
 */

class ControlView {

    constructor(model, htmlView, containerId = '#control-plane') {
        this.model = model;
        this.htmlView = htmlView;
        this.container = $(containerId);
        this.onChange = new SmartDeviceEvent(this);

        this.bindEventListeners();
    }

    appendToDOM() {
        this.container.append(this.getHtmlControlPresentation(this.htmlView));
    }

    getHtmlControlPresentation(template) {
        let htmlContent = template.replace(/{{room-name}}/g, this.model.name);
        let lightStatusStr = (this.model.lightsStatus === 'on' ? 'checked' : '');
        htmlContent = htmlContent.replace('{{lights-checked}}', lightStatusStr);
        let curtainsStatusStr = (this.model.curtainsStatus === 'open' ? 'checked' : '');
        htmlContent = htmlContent.replace('{{curtains-checked}}', curtainsStatusStr);
        return htmlContent.replace('{{temperature-status}}', 'value="' + this.model.temperature + '"');
    }

    bindEventListeners() {

        //To add an additional event (see an example in the comment below)
        //1. Choose an appropriate event name, e.g. 'lock-change' and add it as key to this object
        //2. Associate an object to the key from step 1.
        //3. Each object from step 2 must to hold:
        //  3.1 eventType - a DOM event, such as click, change, keyup, etc.
        //  3.2 targetDOMId - the target DOM element ID which an event listener has to be associated with
        //  3.3 extractValue - a closure which allows to extract the value from the event; If it returns null or NaN no change to the model is made, else a change is made
        let eventListenersMap = {
            'lights-change': {
                eventType: 'change',
                targetDOMId: '#' + this.model.name + '-lights',
                extractValue: (event) => $(event.currentTarget).is(':checked')
            },
            'curtains-change': {
                eventType: 'change',
                targetDOMId: '#' + this.model.name + '-curtains',
                extractValue: (event) => $(event.currentTarget).is(':checked')
            },
            //Room lock example
            /* 'lock-change': {
                eventType: 'change',
                targetDOMId: '#' + this.model.name + '-lock',
                extractValue: (event) => $(event.currentTarget).is(':checked')
            },*/
            'temperature-change': {
                eventType: 'keyup',
                targetDOMId: '#' + this.model.name + '-temperature',
                extractValue: (event) => {
                    if (event.keyCode == 13) {
                        //Only when user presses the Enter key then we set the new temperature
                        let value = event.currentTarget.value;
                        return !isNaN(value) ? parseInt(value) : null;
                    }
                    event.stopPropagation();
                    return null;
                }
            }

        };

        let takeAction = function (eventsMapElement, event, eventKey, _this) {
            let value = eventsMapElement.extractValue(event);
            if (value !== null && !isNaN(value)) {
                let eventData = {
                    event: eventKey,
                    value: value
                };
                _this.onChange.notify(eventData);
            }
        };

        for (let eventKey in eventListenersMap) {
            let eventsMapElement = eventListenersMap[eventKey];
            this.container.find(eventsMapElement.targetDOMId)
                .on(eventsMapElement.eventType, (event) => takeAction(eventsMapElement, event, eventKey, this))
        }
    }

}
