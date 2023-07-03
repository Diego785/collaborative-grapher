import { Operator } from './models';

export const operators: Operator[] = [{
    label: 'op 1',
    tasks: [{
        id: 1,
        duration: 1,
        attributes: {
            attrs: {
                label: {
                    text: 'Task 1'
                }
            }
        }
    }]
}, {
    label: 'op 2',
    tasks: [{
        id: 2,
        duration: 2,
        attributes: {
            attrs: {
                label: {
                    text: 'Task 2'
                },
                root: {
                    stroke: '#fec5bb'
                },
                front: {
                    fill: '#E5989B'
                },
                side: {
                    fill: '#FFB4A2'
                },
                top: {
                    fill: '#FFCDB2'
                }
            }
        }
    }, {
        id: 3,
        duration: 1,
        attributes: {
            attrs: {
                label: {
                    text: 'Task 3'
                },
                root: {
                    stroke: '#d9ed92'
                },
                front: {
                    fill: '#99d98c'
                },
                side: {
                    fill: '#b5e48c'
                },
                top: {
                    fill: '#d9ed92'
                }
            }
        }
    }, {
        id: 5,
        duration: 1,
        attributes: {
            attrs: {
                label: {
                    text: 'Task 5',
                    fill: '#EEE'
                },
                root: {
                    stroke: '#00b4d8'
                },
                front: {
                    fill: '#0077b6'
                },
                side: {
                    fill: '#0096c7'
                },
                top: {
                    fill: '#90e0ef'
                }
            }
        }
    }]
}, {
    label: 'op 3',
    tasks: []
}, {
    label: 'op 4',
    tasks: [{
        id: 4,
        duration: 3,
        attributes: {
            attrs: {
                label: {
                    text: 'Task 4'
                }
            }
        }
    }]
}];
