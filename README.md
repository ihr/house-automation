# Overall file structure
.
├── README.md                           - You are reading this file
├── backend                             - Simulating backend data
│   └── data.json                           - // - 
├── index.html                          - The landing page 
├── js                                  - Holds the JS ES6-based logic
│   ├── controller                      - Bridges the Control View with the Model and the Status View
│   │   └── controller.js                   - // -
│   ├── main.js                         - This app's JS entry point; declares a helper class for event bus implementation; instantiates the mock API
│   ├── model                           - Contains a simple model of the room sensors + event bus connectivity
│   │   └── model.js                        - // -
│   ├── service                         - Simulating REST API calls without actual data persistence
│   │   └── mock_api.js                     - // -
│   └── view                            - Holds two types of view
│       ├── controlView.js              - Control view - use to control the lights, curtains, temperature, etc.
│       └── statusView.js               - Status view - use to display the status of the lights, curtains, temperature, etc.
├── server.js                           - (Optional) This file is only needed if you need to run this app from localhost (see below)
└── static                              - Holds static templates
    ├── control_view_template.html      - One for the Control view
    └── status_view_template.html       - One for the Status view
    
# How to run this app from localhost

NOTE: Be aware that while trying with UI, there will be a delay of roughly 400ms between a control action in the Control View
and the update on the Status view, that is to simulate the network latency to a certain extend
 
1. npm install connect serve-static
// Tested with npm v6.9.0

2. node server.js
// Tested with node v10.15.3

3. Visit http://localhost:8080/index.html
// Tested on
- Chrome Version [ 76.0.3809.132 (Official Build) (64-bit) ]
- Firefox [ 68.0.2 (64-bit),  69.0 (64-bit), 69.0.1 (64-bit) ]

# How to develop own components that react to events :

Hint: follow the 'Room lock example' comments in the code

Assume we are about to add automatic locks. With these we can automatically lock the rooms in the house or unlock them

1. Update the model
1.1 In js/model/model.js, add a property in the Model class constructor, e.g 'this.lockStatus' and initialise it properly
1.2 In js/model/model.js, in the 'switch-case' block of 'set()' method add a case, e.g.  case (data.event === 'lock-change'):

2. Update the view 
2.1. In js/view/controlView.js, in the 'eventListenersMap' object part of the 'bindEventListeners()' method add an 
entry following the docs there
2.2. In js/view/statusView.js, in the getHtmlStatusRepresentationPresentation
2.3. (OPTIONAL) in case more flexibility is needed instead of following step 2.1, one can directly add an event listener 
following the pseudo-code below:

this.container.find('#lock-room-name-status')
                .on('change', (event) => {do something here; if(needed) this.onChange.notify(eventData);}); 

3. Update the presentation
3.1 In static/control_view_template.html, add the necessary UI widget, e.g. the lock / unlock functionality can be made with the same widget as curtains 
change functionality
3.2 In static/status_view_template.html, add the necessary UI widget, e.g. the lock / unlock functionality can be made with the same widget as curtains 
change functionality

5. Update the data -> model mapping
5.1 In main.js, update the creation of the Model, e.g., new Model(room.name, room.curtainsStatus, room.lightsStatus, room.temperature, room.lockStatus)); 
5.2 In backend/data.json, add the necessary properties, e.g. "lockStatus": "locked" or "lockStatus": "unlocked"

# Things to be improved:

Testing:
- add unit test

Logic-wise:
- temperature can be set to 99°C, that does not make sense for a normal room 

UI/UX-wise:
- MDL is outdated it's better to substitute it with MDC (https://github.com/material-components/material-components-web/blob/master/docs/getting-started.md); 
- the temperature regulation should be done in a better way, for example with a temperature knob or a slider
- add more space between the various controls, i.e. Lights & Curtains
- design needs to be improved when adding new controls, e.g. lock/unlock 

# Credits:

My work was influenced by the following resources:

1. https://github.com/ThomasKnobloch/smart-house/ - I like the MDL HTML/CSS design for the Control panel, therefore I opted to reuse it. The two files can be found in the static/ folder, although they are not 1-to-1

2. https://medium.com/@ToddZebert/a-walk-through-of-a-simple-javascript-mvc-implementation-c188a69138dc

3. A few other resources, such as StackOverFlow, Mozilla Dev Docs, etc.

4. https://materialdesignicons.com/

