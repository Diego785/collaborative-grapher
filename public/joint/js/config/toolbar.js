/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


var App = App || {};
App.config = App.config || {};

(function () {

    'use strict';

    App.config.toolbar = {
        groups: {
            'undo-redo': { index: 1 },
            'pgsql-script': { index: 2 },
            'sqlserver-script': { index: 3 },
            'mariadb-script': { index: 4 },
            'view-crud': { index: 5 },
            'open': { index: 6 },
            'save': { index: 7 },
            'clear': { index: 8 },
            'export': { index: 9 },
            'print': { index: 10 },
            'fullscreen': { index: 11 },
            'order': { index: 12 },
            'layout': { index: 13 },
            'zoom': { index: 14 },
            'grid': { index: 15 },
            'snapline': { index: 16 },
            'relations': { index: 17 },
        },
        tools: [
            {
                type: 'undo',
                name: 'undo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': 'Undo',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'redo',
                name: 'redo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': 'Redo',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'relations',
                group: 'clear',
                text: 'Relaciones',
                attrs: {
                    button: {
                        id: 'btn-relations',
                        'data-tooltip': 'Seleccione los tipos de relaciones',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    },
                }
            },
            {
                type: 'button',
                name: 'script',
                group: 'clear',
                text: 'Pgsql',
                attrs: {
                    button: {
                        id: 'btn-png',
                        'data-tooltip': 'Genera Scrip de PostgreSQL',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    },
                }
            },
            {
                type: 'button',
                name: 'server',
                group: 'clear',
                text: 'SQL Server',
                attrs: {
                    button: {
                        id: 'btn-png',
                        'data-tooltip': 'Genera Script de SQL Server',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    },
                }
            },
            {
                type: 'button',
                name: 'mariadb',
                group: 'clear',
                text: 'MariaDB',
                attrs: {
                    button: {
                        id: 'btn-png',
                        'data-tooltip': 'Genera Script de MariaDB',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    },
                }
            },

            {
                type: 'button',
                name: 'view',
                group: 'clear',
                text: 'Crud',
                attrs: {
                    button: {
                        id: 'btn-view',
                        'data-tooltip': 'Open as PNG in a pop-up',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    },
                }
            },
            {
                type: 'button',
                name: 'open',
                group: 'clear',
                text: 'Open',
                attrs: {
                    button: {
                        id: 'btn-open',
                        'data-tooltip': 'Abrir diagrama',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container',
                    },
                }
            },
            {
                type: 'button',
                name: 'save',
                group: 'clear',
                text: 'Save',
                attrs: {
                    button: {
                        id: 'btn-save',
                        'data-tooltip': 'Giardar diagrama',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container',
                    },
                }
            },
            {
                type: 'button',
                name: 'clear',
                group: 'clear',
                attrs: {
                    button: {
                        id: 'btn-clear',
                        'data-tooltip': 'Clear Paper',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'svg',
                group: 'export',
                text: 'Export SVG',
                attrs: {
                    button: {
                        id: 'btn-svg',
                        'data-tooltip': 'Open as SVG in a pop-up',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'png',
                group: 'export',
                text: 'Export PNG',
                attrs: {
                    button: {
                        id: 'btn-png',
                        'data-tooltip': 'Open as PNG in a pop-up',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'print',
                group: 'print',
                attrs: {
                    button: {
                        id: 'btn-print',
                        'data-tooltip': 'Open a Print Dialog',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-front',
                group: 'order',
                text: 'Send To Front',
                attrs: {
                    button: {
                        id: 'btn-to-front',
                        'data-tooltip': 'Bring Object to Front',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-back',
                group: 'order',
                text: 'Send To Back',
                attrs: {
                    button: {
                        id: 'btn-to-back',
                        'data-tooltip': 'Send Object to Back',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                group: 'layout',
                name: 'layout',
                attrs: {
                    button: {
                        id: 'btn-layout',
                        'data-tooltip': 'Auto-layout Graph',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-to-fit',
                name: 'zoom-to-fit',
                group: 'zoom',
                attrs: {
                    button: {
                        'data-tooltip': 'Zoom To Fit',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-out',
                name: 'zoom-out',
                group: 'zoom',
                attrs: {
                    button: {
                        'data-tooltip': 'Zoom Out',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'label',
                name: 'zoom-slider-label',
                group: 'zoom',
                text: 'Zoom:'
            },
            {
                type: 'zoom-slider',
                name: 'zoom-slider',
                group: 'zoom'
            },
            {
                type: 'zoom-in',
                name: 'zoom-in',
                group: 'zoom',
                attrs: {
                    button: {
                        'data-tooltip': 'Zoom In',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'separator',
                group: 'grid'
            },
            {
                type: 'label',
                name: 'grid-size-label',
                group: 'grid',
                text: 'Grid size:',
                attrs: {
                    label: {
                        'data-tooltip': 'Change Grid Size',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'range',
                name: 'grid-size',
                group: 'grid',
                text: 'Grid size:',
                min: 1,
                max: 50,
                step: 1,
                value: 10
            },
            

            {
                type: 'fullscreen',
                name: 'fullscreen',
                group: 'fullscreen',
                attrs: {
                    button: {
                        'data-tooltip': 'Toggle Fullscreen Mode',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },

        ]
    };

  
})();
