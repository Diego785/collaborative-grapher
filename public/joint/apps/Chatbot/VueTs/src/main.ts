/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import Vue from 'vue';

import App from 'src/App.vue';
import 'src/styles.scss';

import { EventBusService } from 'src/services/event-bus.service';
import batchDirective from 'src/directives/batch.directive';

Vue.directive('batch', batchDirective);

Vue.prototype.$eventBusService = new EventBusService();

new Vue({
    render: h => h(App)
}).$mount('#app');
