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

    var options = {

        colorPalette: [
            { content: 'transparent', icon: 'assets/transparent-icon.svg' },
            { content: '#f6f6f6' },
            { content: '#dcd7d7' },
            { content: '#8f8f8f' },
            { content: '#c6c7e2' },
            { content: '#feb663' },
            { content: '#fe854f' },
            { content: '#b75d32' },
            { content: '#31d0c6' },
            { content: '#7c68fc' },
            { content: '#61549c' },
            { content: '#6a6c8a' },
            { content: '#4b4a67' },
            { content: '#3c4260' },
            { content: '#33334e' },
            { content: '#222138' }
        ],

        colorPaletteReset: [
            { content: undefined, icon: 'assets/no-color-icon.svg' },
            { content: '#f6f6f6' },
            { content: '#dcd7d7' },
            { content: '#8f8f8f' },
            { content: '#c6c7e2' },
            { content: '#feb663' },
            { content: '#fe854f' },
            { content: '#b75d32' },
            { content: '#31d0c6' },
            { content: '#7c68fc' },
            { content: '#61549c' },
            { content: '#6a6c8a' },
            { content: '#4b4a67' },
            { content: '#3c4260' },
            { content: '#33334e' },
            { content: '#222138' }
        ],

        fontWeight: [
            { value: '300', content: '<span style="font-weight: 300">Light</span>' },
            { value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
            { value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
        ],

        fontFamily: [
            { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
            { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
            { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
        ],

        strokeStyle: [
            { value: '0', content: 'Solid' },
            { value: '2,5', content: 'Dotted' },
            { value: '10,5', content: 'Dashed' }
        ],

        side: [
            { value: 'top', content: 'Top Side' },
            { value: 'right', content: 'Right Side' },
            { value: 'bottom', content: 'Bottom Side' },
            { value: 'left', content: 'Left Side' }
        ],

        portLabelPositionRectangle: [
            { value: { name: 'top', args: { y: -12 } }, content: 'Above' },
            { value: { name: 'right', args: { y: 0 } }, content: 'On Right' },
            { value: { name: 'bottom', args: { y: 12 } }, content: 'Below' },
            { value: { name: 'left', args: { y: 0 } }, content: 'On Left' }
        ],

        portLabelPositionEllipse: [
            { value: 'radial', content: 'Horizontal' },
            { value: 'radialOriented', content: 'Angled' }
        ],

        imageIcons: [
            { value: 'assets/image-icon1.svg', content: '<img height="42px" src="assets/image-icon1.svg"/>' },
            { value: 'assets/image-icon2.svg', content: '<img height="80px" src="assets/image-icon2.svg"/>' },
            { value: 'assets/image-icon3.svg', content: '<img height="80px" src="assets/image-icon3.svg"/>' },
            { value: 'assets/image-icon4.svg', content: '<img height="80px" src="assets/image-icon4.svg"/>' }
        ],

        imageGender: [
            { value: 'assets/member-male.png', content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
            { value: 'assets/member-female.png', content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
        ],

        arrowheadSize: [
            { value: 'M 0 0 0 0', content: 'None' },
            { value: 'M 0 -3 -6 0 0 3 z', content: 'Small' },
            { value: 'M 0 -5 -10 0 0 5 z', content: 'Medium' },
            { value: 'M 0 -10 -15 0 0 10 z', content: 'Large' },
        ],

        strokeWidth: [
            { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
            { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
            { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
            { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
        ],

        router: [
            { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
            { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
            { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
        ],

        connector: [
            { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
            { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
            { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
        ],

        labelPosition: [
            { value: 30, content: 'Close to source' },
            { value: 0.5, content: 'In the middle' },
            { value: -30, content: 'Close to target' },
        ],

        portMarkup: [{
            value: [{
                tagName: 'rect',
                selector: 'portBody',
                attributes: {
                    'width': 20,
                    'height': 20,
                    'x': -10,
                    'y': -10
                }
            }],
            content: 'Rectangle'
        }, {
            value: [{
                tagName: 'circle',
                selector: 'portBody',
                attributes: {
                    'r': 10
                }
            }],
            content: 'Circle'
        }, {
            value: [{
                tagName: 'path',
                selector: 'portBody',
                attributes: {
                    'd': 'M -10 -10 10 -10 0 10 z'
                }
            }],
            content: 'Triangle'
        }]
    };

    App.config.inspector = {


        'uml.Class': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'name',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'name',
                            index: 5
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'attributes',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'attributes',
                            index: 5
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'methods',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'methods',
                            index: 5
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 1,
                    label: 'Class name'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 1,
                    label: 'Attributes'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'methods',
                    index: 1,
                    label: 'Methods'
                }
            },
            groups: {
                name: {
                    label: 'Class name',
                    index: 1
                },
                attributes: {
                    label: 'Attributes',
                    index: 2
                },
                methods: {
                    label: 'Methods',
                    index: 3
                }
            }
        },
        'uml.Interface': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'name',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'name',
                            index: 2
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'attributes',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'attributes',
                            index: 2
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'methods',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'methods',
                            index: 2
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 0,
                    label: 'Interface name'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 0,
                    label: 'Attributes'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'methods',
                    index: 0,
                    label: 'Methods'
                }
            },
            groups: {
                name: {
                    label: 'Interface name',
                    index: 1
                },
                attributes: {
                    label: 'Attributes',
                    index: 2
                },
                methods: {
                    label: 'Methods',
                    index: 3
                }
            }
        },
        'uml.Abstract': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'name',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'name',
                            index: 2
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'attributes',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'attributes',
                            index: 2
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'methods',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'methods',
                            index: 2
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 0,
                    label: 'Abstract class name'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 0,
                    label: 'Attributes'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'methods',
                    index: 0,
                    label: 'Methods'
                }
            },
            groups: {
                name: {
                    label: 'Abstract class name',
                    index: 1
                },
                attributes: {
                    label: 'Attributes Text',
                    index: 2
                },
                methods: {
                    label: 'Methods Text',
                    index: 3
                }
            }
        },
        'uml.State': {
            inputs: {
                name: {
                    group: 'text',
                    index: 1,
                    type: 'text'
                },
                events: {
                    group: 'events',
                    index: 1,
                    type: 'list',
                    item: {
                        type: 'text'
                    }
                },
                attrs: {
                    '.uml-state-name': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'text',
                            when: { ne: { 'name': '' } },
                            index: 5
                        }
                    },
                    '.uml-state-body': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Outline',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: 'Outline thickness',
                            group: 'presentation',
                            when: { ne: { 'attrs/.uml-state-body/stroke': 'transparent' } },
                            index: 4
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: 'Outline style',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.uml-state-body/stroke': 'transparent' } },
                                    { ne: { 'attrs/.uml-state-body/stroke-width': 0 } }
                                ]
                            },
                            index: 5
                        }
                    },
                    '.uml-state-separator': {
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Horizontal rule outline',
                            group: 'presentation',
                            index: 3
                        }
                    },
                    '.uml-state-events': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: 'Fill',
                            group: 'events',
                            when: { ne: { 'events': 0 } },
                            index: 5
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: 'Presentation',
                    index: 1
                },
                text: {
                    label: 'State name text',
                    index: 2
                },
                events: {
                    label: 'State events text',
                    index: 3
                }
            }
        },

    };

})();
