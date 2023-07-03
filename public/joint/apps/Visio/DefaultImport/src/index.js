/*! JointJS+ v3.7.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-06-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


document.body.classList.add('loading');

joint.format.Visio.VisioArchive.fromURL('network.vsdx').then(function(archive) {

    var page = archive.document.getPages()[0];

    var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        interactive: false,
        width: page.width,
        height: page.height,
        sorting: joint.dia.Paper.sorting.APPROX,
        async: true,
        frozen: true
    });

    page.getContent().then(function(content) {
        var cells = content.toGraphCells();
        graph.resetCells(cells);
        paper.unfreeze();
        document.body.classList.remove('loading');
    });
});
