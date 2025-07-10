import GenericLabel from "./genericLabel.js";
const CustomEventInitializer = {
    init: function() {
        GenericLabel.initializeEventHandlers();
    }
};
document.addEventListener('DOMContentLoaded', function() {
    CustomEventInitializer.init();
});