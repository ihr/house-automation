/**
 * Displays the status of devices' sensors in the room
 */

class StatusView {

    constructor(model, htmlView, containerId = '#status-plane') {
        this.model = model;
        this.htmlView = htmlView;
        this.$container = $(containerId);
        this.init();
    }

    init() {
        this.$container.append(this.getHtmlStatusRepresentationPresentation(this.htmlView));
    }

    refresh() {
        let view = this.$container.find('#' + this.model.name + '-status');
        view.replaceWith(this.getHtmlStatusRepresentationPresentation(this.htmlView));
    }

    getHtmlStatusRepresentationPresentation(template) {
        let htmlContent = template.replace(/{{room-name}}/g, this.model.name);

        //Lights
        let lightsStatusStr = (this.model.lightsStatus === 'on' ? '<span style="color:#2e7d32">ON</style>' : '<span style="color:#c62828">OFF</style>');
        htmlContent = htmlContent.replace('{{lights-status}}', 'Lights ' + lightsStatusStr);
        let lightsIconStr = (this.model.lightsStatus === 'on' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off');
        htmlContent = htmlContent.replace('{{lights-icon}}', lightsIconStr);
        //Curtains
        let curtainsStatusStr = (this.model.curtainsStatus === 'open' ? '<span style="color:#2e7d32">OPEN</style>' : '<span style="color:#c62828">CLOSED</style>');
        htmlContent = htmlContent.replace('{{curtains-status}}', 'Curtains ' + curtainsStatusStr);
        let curtainsIconStr = (this.model.curtainsStatus === 'open' ? 'mdi-eye-outline' : 'mdi-eye-off-outline');
        htmlContent = htmlContent.replace('{{curtains-icon}}', curtainsIconStr);
        /* lock - Room lock example
        let lockStatusStr = (this.model.lockStatus === 'locked' ? '<span style="color:#2e7d32">LOCKED</style>' : '<span style="color:#c62828">UNLOCKED</style>');
        htmlContent = htmlContent.replace('{{lock-status}}', 'Lock ' + lockStatusStr);
        let lockIconStr = (this.model.lockStatus === 'locked' ? 'mdi-lock-outline' : 'mdi-lock-open-outline');
        htmlContent = htmlContent.replace('{{lock-icon}}', lockIconStr);
        */
        //Temperature
        let temperatureStatusStr = this.model.temperature + String.fromCharCode(176) + 'C';
        return htmlContent.replace('{{temperature-status}}', temperatureStatusStr);
    }

}
