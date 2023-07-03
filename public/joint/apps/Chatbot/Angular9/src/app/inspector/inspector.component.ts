/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { dia } from '@clientio/rappid';

import { EventBusService } from 'src/services/event-bus.service';
import { ShapeTypesEnum } from 'src/rappid/shapes/app.shapes';
import { SharedEvents } from 'src/rappid/controller';


@Component({
    selector: 'chatbot-inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.scss']
})

export class InspectorComponent implements OnInit, OnDestroy {

    public cell: dia.Cell;
    public subscriptions = new Subscription();
    public shapeTypesEnum = ShapeTypesEnum;

    constructor(private readonly eventBusService: EventBusService) {
    }

    public ngOnInit(): void {
        this.subscriptions.add(
            this.eventBusService.on(SharedEvents.SELECTION_CHANGED, (selection: dia.Cell[]) => this.setCell(selection))
        );
    }

    private setCell(selection: dia.Cell[]): void {
        const [cell = null] = selection;
        this.cell = cell;
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
