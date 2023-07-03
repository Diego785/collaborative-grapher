/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { Directive } from '@angular/core';

import { EventBusService } from 'src/services/event-bus.service';
import { SharedEvents } from 'src/rappid/controller';

const BATCH_NAME = 'inspector-input';

@Directive({
    selector: '[batch]',
    host: {
        '(focus)': 'onFocus()',
        '(focusout)': 'onFocusOut()'
    }
})
export class BatchDirective {
    constructor(private eventBusService: EventBusService) {
    }

    public onFocus() {
        const { eventBusService } = this;
        eventBusService.emit(SharedEvents.GRAPH_START_BATCH, BATCH_NAME);
    }

    public onFocusOut() {
        const { eventBusService } = this;
        eventBusService.emit(SharedEvents.GRAPH_STOP_BATCH, BATCH_NAME);
    }
}
