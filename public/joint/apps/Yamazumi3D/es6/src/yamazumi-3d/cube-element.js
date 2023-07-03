import { dia, shapes, util } from '@clientio/rappid';

const TASK_TYPE = 'yamazumi.Cube';
const TASK_ANIMATION = {
    easing: 'ease-in',
    fill: 'forwards',
    duration: 200
};

export class Cube extends dia.Element {
    constructor() {
        super(...arguments);
        
        this.markup = [{
                tagName: 'path',
                selector: 'top'
            }, {
                tagName: 'path',
                selector: 'side'
            }, {
                tagName: 'rect',
                selector: 'front'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
    
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: TASK_TYPE, size: {
                width: 180,
                height: 50
            }, attrs: {
                root: {
                    stroke: '#ddd'
                },
                front: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    fill: '#aaa'
                },
                side: {
                    strokeWidth: 1,
                    d: 'M calc(w) 0 l 20 -20 v calc(h) l -20 20 z',
                    fill: '#bbb'
                },
                top: {
                    strokeWidth: 1,
                    d: 'M 0 0 l 20 -20 h calc(w) l -20 20 z',
                    fill: '#ccc'
                },
                label: {
                    stroke: 'none',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    y: 'calc(0.5*h)',
                    x: 'calc(0.5*w)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    fill: '#222'
                }
            } });
    }
    
    static createSide(depth) {
        return {
            strokeWidth: 1,
            d: `M calc(w) 0 l ${depth} -${depth} v calc(h) l -${depth} ${depth} z`,
            fill: '#bbb'
        };
    }
    
    static createTop(depth) {
        return {
            strokeWidth: 1,
            d: `M 0 0 l ${depth} -${depth} h calc(w) l -${depth} ${depth} z`,
            fill: '#ccc'
        };
    }
}

export class CubeView extends dia.ElementView {
    
    updateTransformation() {
        
        const { el, model } = this;
        const { x, y } = model.get('position');
        const transform = `translate(${x}px, ${y}px)`;
        const keyframes = { transform: [transform] };
        let move;
        if (this.move) {
            move = this.move;
            move.effect.setKeyframes(keyframes);
            move.currentTime = 0;
        }
        else {
            move = el.animate(keyframes, TASK_ANIMATION);
            move.onfinish = () => move.commitStyles();
            this.move = move;
        }
        if (model.get('animation')) {
            move.play();
        }
        else {
            move.finish();
        }
    }
}

util.setByPath(shapes, TASK_TYPE, Cube, '.');
if (TASK_ANIMATION) {
    util.setByPath(shapes, `${TASK_TYPE}View`, CubeView, '.');
}
