/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


Vue.component('Rappid', {
    mounted: function() {
        joint.setTheme('modern');
        const rappid = new App.MainView({ el: this.$el });
        const themePicker = new App.ThemePicker({ mainView: rappid });
        themePicker.render().$el.appendTo(document.body);
        rappid.graph.fromJSON(JSON.parse(App.config.sampleGraphs.emergencyProcedure));
    },
    template: `
        <div class="joint-app joint-theme-modern">
            <div class="app-header">
                <div class="app-title">
                    <h1>JointJS+</h1>
                </div>
                <div class="toolbar-container"></div>
            </div>
            <div class="app-body">
                <div class="stencil-container"></div>
                <div class="paper-container"></div>
                <div class="inspector-container"></div>
                <div class="navigator-container"></div>
            </div>
        </div>
    `
});
