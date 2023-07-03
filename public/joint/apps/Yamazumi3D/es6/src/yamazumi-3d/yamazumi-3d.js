import { dia, ui, layout, V, elementTools } from '@clientio/rappid';
import { Cube } from './cube-element';

export class Yamazumi3D {
    
    constructor(options) {
        this.topLeft = options.topLeft;
        this.operators = options.operators;
        this.paper = options.paper;
        this.height = options.height;
        this.durationHeight = options.durationHeight || 70;
        this.maxDuration = options.maxDuration || 4;
        this.taskMargin = options.taskMargin || 10;
        this.taskWidth = options.taskWidth || 200;
        this.taskDepth = options.taskDepth || 20;
        
        this.createOperators();
        
        const layoutOptions = {
            direction: layout.StackLayout.Directions.BottomTop,
            bottomLeft: {
                x: this.topLeft.x,
                y: this.topLeft.y + this.height
            },
            stackCount: 4,
            stackSize: this.taskWidth,
            stackElementGap: this.taskMargin,
            setAttributes: (el, { position }) => {
                el.set({
                    position,
                    animation: (position.x === el.position().x)
                }, {
                    ignoreCommandManager: true
                });
            }
        };
        
        this.layoutView = new ui.StackLayoutView({
            layoutOptions: layoutOptions,
            paper: this.paper,
            preview: (data, view) => {
                const { targetStack, invalid } = data;
                const size = targetStack.bbox.width - view.model.get('stackGap');
                let color = 'blue';
                if (invalid) {
                    color = 'red';
                }
                
                const preview = V('path', {
                    'stroke': color,
                    'stroke-width': 2,
                    'fill': 'none',
                    'd': `M ${-size / 2} 0 h ${size} l ${this.taskDepth} ${-this.taskDepth}`
                });
                
                return preview.node;
            },
            validateMoving: (data) => {
                if (data.targetStack !== data.sourceStack) {
                    const totalDuration = data.targetStack.elements.reduce((agg, el) => agg + el.get('duration'), 0);
                    if (totalDuration + data.sourceElement.get('duration') > this.maxDuration) {
                        return false;
                    }
                }
                return true;
            }
        });
        
        this.layoutView.model.on('update', () => {
            this.layoutView.model.stacks.forEach((st, i) => {
                st.elements.forEach((el, j) => {
                    el.set('z', i * 100 + j, { ignoreCommandManager: true });
                });
            });
        });
        
        this.paper.model.on('change:duration', (el) => this.setTaskHeight(el));
        
        this.drawTakt();
        this.drawYAxis();
        
        this.paper.on('element:mouseenter', (view) => {
            const buttonSize = 10;
            const margin = 4;
            const { model } = view;
            const toolsView = new dia.ToolsView({
                tools: [
                    new elementTools.Button({
                        markup: [{
                                tagName: 'circle',
                                selector: 'button',
                                attributes: {
                                    'r': buttonSize,
                                    'fill': '#fff',
                                    'fill-opacity': 0.6,
                                    'cursor': 'pointer'
                                }
                            }, {
                                tagName: 'text',
                                textContent: '+',
                                selector: 'icon',
                                attributes: {
                                    'fill': '#333',
                                    'font-size': 20,
                                    'text-anchor': 'middle',
                                    'font-weight': 'bold',
                                    'pointer-events': 'none',
                                    'y': '0.3em'
                                }
                            }],
                        x: '100%',
                        y: '100%',
                        offset: {
                            x: -3 * buttonSize - 2 * margin,
                            y: -buttonSize - margin
                        },
                        useModelGeometry: true,
                        action: () => {
                            const { duration } = model.attributes;
                            const stack = this.layoutView.model.getStackFromElement(model);
                            const totalDuration = stack.elements.reduce((agg, el) => agg + el.get('duration'), 0);
                            if (totalDuration === this.maxDuration)
                                return;
                            const newDuration = duration + 1;
                            this.paper.model.startBatch('yamazumi-duration-change');
                            model.set('duration', newDuration);
                            this.layoutView.model.update();
                            this.paper.model.stopBatch('yamazumi-duration-change');
                        }
                    }),
                    new elementTools.Button({
                        markup: [{
                                tagName: 'circle',
                                selector: 'button',
                                attributes: {
                                    'r': buttonSize,
                                    'fill': 'white',
                                    'fill-opacity': 0.6,
                                    'cursor': 'pointer'
                                }
                            }, {
                                tagName: 'text',
                                textContent: '-',
                                selector: 'icon',
                                attributes: {
                                    'fill': '#333',
                                    'font-size': 20,
                                    'text-anchor': 'middle',
                                    'font-weight': 'bold',
                                    'pointer-events': 'none',
                                    'y': '0.3em'
                                }
                            }],
                        
                        x: '100%',
                        y: '100%',
                        offset: {
                            x: -buttonSize - margin,
                            y: -buttonSize - margin
                        },
                        useModelGeometry: true,
                        action: () => {
                            const { duration } = model.attributes;
                            if (duration < 2)
                                return;
                            const newDuration = duration - 1;
                            this.paper.model.startBatch('yamazumi-duration-change');
                            model.set('duration', newDuration);
                            this.layoutView.model.update();
                            this.paper.model.stopBatch('yamazumi-duration-change');
                        }
                    })
                ]
            });
            view.addTools(toolsView);
        });
        
        this.paper.on('element:mouseleave', (view) => {
            view.removeTools();
        });
    }
    
    createOperators() {
        const graph = this.paper.model;
        this.operators.forEach((operator, operatorIndex) => {
            const { tasks } = operator;
            tasks.forEach((task, taskIndex) => {
                const { id, duration, attributes = {} } = task;
                attributes.attrs.side = Object.assign(Cube.createSide(this.taskDepth), attributes.attrs.side);
                attributes.attrs.top = Object.assign(Cube.createTop(this.taskDepth), attributes.attrs.top);
                const cube = new Cube(Object.assign(Object.assign({}, attributes), { stackIndex: operatorIndex, stackElementIndex: taskIndex, duration,
                    id }));
                this.setTaskHeight(cube);
                graph.addCell(cube);
            });
        });
    }
    
    setTaskHeight(task) {
        task.prop(['size', 'height'], this.computeTaskHeight(task.get('duration')), {
            ignoreCommandManager: true
        });
    }
    
    computeTaskHeight(duration) {
        return duration * this.durationHeight + (duration - 1) * this.taskMargin;
    }
    
    drawYAxis() {
        let y = this.topLeft.y + this.height + this.taskMargin / 2;
        const startY = y;
        const layer = this.paper.getLayerNode(dia.Paper.Layers.BACK);
        const axis = V('g');
        while (y > this.topLeft.y) {
            V('path', {
                'stroke': 'lightgray',
                'stroke-width': 2,
                'd': `M ${this.topLeft.x - 15} ${y} h 10`
            }).appendTo(axis);
            y -= this.durationHeight + this.taskMargin;
        }
        V('path', {
            'stroke': 'gray',
            'd': `M ${this.topLeft.x - 15} ${startY} V ${y + this.durationHeight + this.taskMargin}`
        }).appendTo(axis);
        axis.appendTo(layer);
        return axis;
    }
    
    drawTakt() {
        let y = this.topLeft.y + this.height - this.maxDuration * (this.durationHeight + this.taskMargin) - this.taskDepth;
        const layer = this.paper.getLayerNode(dia.Paper.Layers.BACK);
        return V('path', {
            'stroke': 'red',
            'stroke-width': 2,
            'fill': 'none',
            'd': `M ${this.topLeft.x + 15} ${y} h ${this.operators.length * (this.taskWidth + this.taskMargin)} M ${this.topLeft.x + 15} ${y} l -20 20`
        }).appendTo(layer);
    }
}
