import { dia, shapes, ui } from '@clientio/rappid';
import { operators } from './yamazumi-3d/data';
import { Yamazumi3D } from './yamazumi-3d/yamazumi-3d';

export const init = () => {

    const graph = new dia.Graph({}, { cellNamespace: shapes });

    const paper = new dia.Paper({
        el: document.getElementById('paper'),
        width: 900,
        height: 600,
        model: graph,
        drawGrid: { name: 'mesh', color: '#d4d4d4' },
        background: { color: '#FBFBFB' },
        moveThreshold: 10,
        clickThreshold: 10,
        async: true,
        sorting: dia.Paper.sorting.APPROX,
        cellViewNamespace: shapes,
        interactive: false,
    });

    const yamazumi = new Yamazumi3D({
        paper,
        topLeft: {
            x: 20,
            y: 50
        },
        maxDuration: 6,
        height: 530,
        operators: operators
    });

    const cmd = new dia.CommandManager({
        graph,
        cmdBeforeAdd: function(_cmdName, _cell, _graph, options = {}) {
            return !options.ignoreCommandManager;
        }
    });

    cmd.on('stack:undo stack:redo', function() {
        yamazumi.layoutView.model.update();
    });

    const toolbar = new ui.Toolbar({
        el: document.getElementById('toolbar'),
        tools: ['undo', 'redo'],
        autoToggle: true,
        references: { commandManager: cmd  }
    });

    toolbar.render();
};
