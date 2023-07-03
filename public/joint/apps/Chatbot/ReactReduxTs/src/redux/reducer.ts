/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from '@clientio/rappid';

import { SharedEvents } from 'src/rappid/controller';
import RappidService from 'src/services/rappid.service';
import { STORE_RAPPID } from 'src/redux/helpers/actionTypes';

export interface State {
    rappid: RappidService;
    graphJSON: object;
    selection: dia.Cell[];
}

const initialState: State = {
    rappid: null as RappidService,
    graphJSON: {},
    selection: []
};

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case STORE_RAPPID:
            return {
                ...state,
                rappid: action.payload
            };
        case SharedEvents.GRAPH_CHANGED:
            return {
                ...state,
                graphJSON: action.payload
            };
        case SharedEvents.SELECTION_CHANGED:
            return {
                ...state,
                selection: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
