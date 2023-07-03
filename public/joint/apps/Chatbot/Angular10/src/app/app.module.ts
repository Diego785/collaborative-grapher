/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ChatbotModule } from 'src/app/chatbot/chatbot.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ChatbotModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
