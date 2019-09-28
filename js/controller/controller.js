/**
 * Bridges the Control View with the Model and the Status View
 */

class Controller {
    constructor(model, controlView, statusView) {
        this.model = model;
        this.controlView = controlView;
        this.statusView = statusView;

        // Control Views

        //On a change from the Control View update the model
        //Other views can be added in a similar manner
        this.controlView.onChange.attach((sender, data) => this.model.set(data));

        // Status Views

        //On a change from the model update the Status View
        //Other views can be added in a similar manner
        this.model.onChange.attach(() => this.statusView.refresh());
    }
}