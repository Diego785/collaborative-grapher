/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { Component, Input } from '@angular/core';
import { shapes } from '@clientio/rappid';

import { BaseInspectorComponent } from 'src/app/inspector/base-inspector/base-inspector.component';

@Component({
    selector: 'app-link-inspector',
    templateUrl: './link-inspector.component.html',
    styleUrls: ['../inspector.component.scss']
})
export class LinkInspectorComponent extends BaseInspectorComponent {

    @Input() cell: shapes.app.Link;

    public label: string;

    public props = {
        label: ['labels', 0, 'attrs', 'labelText', 'text']
    };

    protected assignFormFields(): void {
        const { cell, props } = this;
        this.label = cell.prop(props.label);
    }
}
