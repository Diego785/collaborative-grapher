import './bootstrap';

import * as joint from 'jointjs';

window.joint = joint;

import io from 'socket.io-client';

const socket = io('http://localhost:3000');


