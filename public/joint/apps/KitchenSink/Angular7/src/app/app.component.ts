/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { Component, ElementRef, OnInit } from '@angular/core';

import { StencilService } from '../services/stencil-service';
import { ToolbarService } from '../services/toolbar-service';
import { InspectorService } from '../services/inspector-service';
import { HaloService } from '../services/halo-service';
import { KeyboardService } from '../services/keyboard-service';
import RappidService from '../services/kitchensink-service';

import { ThemePicker } from '../components/theme-picker';
import { sampleGraphs } from '../config/sample-graphs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    private rappid: RappidService;

    constructor(private element: ElementRef) {

    }

    ngOnInit() {

        this.rappid = new RappidService(
            this.element.nativeElement,
            new StencilService(),
            new ToolbarService(),
            new InspectorService(),
            new HaloService(),
            new KeyboardService()
        );
        this.rappid.startRappid();

        const themePicker = new ThemePicker({ mainView: this.rappid });
        themePicker.render().$el.appendTo(document.body);

        this.rappid.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));
    }
}
