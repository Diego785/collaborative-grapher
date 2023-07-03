/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import RappidService from 'src/services/rappid.service';
import { EventBusService } from 'src/services/event-bus.service';
import { STENCIL_WIDTH } from 'src/theme';
import { SharedEvents } from 'src/rappid/controller';
import { loadStencilShapes, importGraphFromJSON, zoomToFit } from 'src/rappid/actions';

import exampleGraphJSON from 'src/rappid/config/example-graph.json';

@Component({
    selector: 'chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.scss'],
    host: { class: 'rappid-scope' },
    encapsulation: ViewEncapsulation.None
})

export class ChatbotComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('paper') paper: ElementRef;
    @ViewChild('stencil') stencil: ElementRef;
    @ViewChild('toolbar') toolbar: ElementRef;

    public rappid: RappidService;
    public stencilOpened = true;
    public jsonEditorOpened = true;
    public fileJSON: object;

    private subscriptions = new Subscription();

    constructor(private element: ElementRef,
                private eventBusService: EventBusService,
                private cdr: ChangeDetectorRef,
                private renderer: Renderer2) {
    }

    public ngOnInit(): void {
        const { subscriptions, eventBusService } = this;
        subscriptions.add(
            eventBusService.on(SharedEvents.GRAPH_CHANGED, (json: object) => this.onRappidGraphChange(json))
        );
        subscriptions.add(
            eventBusService.on(SharedEvents.JSON_EDITOR_CHANGED, (json: object) => this.onJsonEditorChange(json))
        );
    }

    public ngAfterViewInit(): void {
        const { element, paper, stencil, toolbar, eventBusService, cdr } = this;
        this.rappid = new RappidService(
            element.nativeElement,
            paper.nativeElement,
            stencil.nativeElement,
            toolbar.nativeElement,
            eventBusService,
        );
        this.setStencilContainerSize();
        this.onStart();
        cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.rappid.destroy();
    }

    public openFile(json: object): void {
        const { rappid } = this;
        this.fileJSON = json;
        importGraphFromJSON(rappid, json);
        zoomToFit(rappid);
    }

    public toggleJsonEditor(): void {
        this.jsonEditorOpened = !this.jsonEditorOpened;
    }

    public toggleStencil(): void {
        this.stencilOpened = !this.stencilOpened;
        this.onStencilToggle();
    }

    private onStart(): void {
        const { rappid } = this;
        loadStencilShapes(rappid);
        this.openFile(exampleGraphJSON);
    }

    private onJsonEditorChange(json: object): void {
        const { rappid } = this;
        if (rappid) { importGraphFromJSON(rappid, json); }
    }

    private onRappidGraphChange(json: object): void {
        this.fileJSON = json;
    }

    private setStencilContainerSize(): void {
        const { renderer, stencil } = this;
        renderer.setStyle(stencil.nativeElement, 'width', `${STENCIL_WIDTH}px`);
        this.onStencilToggle();
    }

    private onStencilToggle(): void {
        const { rappid, stencilOpened } = this;
        const { scroller, stencil } = rappid;
        if (stencilOpened) {
            stencil.unfreeze();
            scroller.el.scrollLeft += STENCIL_WIDTH;
        } else {
            stencil.freeze();
            scroller.el.scrollLeft -= STENCIL_WIDTH;
        }
    }
}
