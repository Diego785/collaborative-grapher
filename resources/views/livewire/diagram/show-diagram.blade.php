

<div>
    <div>
        <div id="canvas"></div>
    </div>

    <button id="duplicateBtn">Crear Clase</button>

    <div>
        <input type="text" wire:model="message" placeholder="Escribe tu mensaje">
        <button wire:click="sendMessage">Enviar</button>
    </div>
    <div>
        <p>Mensaje recibido: {{ $receivedMessage }}</p>
    </div>


    @push('js')
        <script>
            document.addEventListener('livewire:load', function() {
                // Obtén una referencia al elemento de lienzo
                var canvas = document.getElementById('canvas');

                // Crea un nuevo lienzo de JointJS
                var graph = new joint.dia.Graph();

                // Crea un nuevo papel (paper) de JointJS y vincúlalo al lienzo
                var paper = new joint.dia.Paper({
                    el: canvas,
                    model: graph,
                    width: 800,
                    height: 400,
                    gridSize: 10,
                    drawGrid: true,
                    interactive: function(cellView) {
                        // Permite la edición de elementos
                        return {
                            elementMove: true,
                            vertexAdd: false,
                            vertexMove: false,
                            vertexRemove: false,
                            arrowheadMove: false,
                            elementResize: true
                        };
                    },
                });

                // Crea una nueva clase en el lienzo
                function createClass(x, y, name, attributes, methods) {
                    var classWidth = 100;
                    var classHeight = 100;
                    var classPadding = 10;

                    // Crea el rectángulo de la clase
                    var rect = new joint.shapes.standard.Rectangle({
                        position: {
                            x: x,
                            y: y
                        },
                        size: {
                            width: classWidth,
                            height: classHeight
                        },
                        attrs: {
                            rect: {
                                fill: 'white',
                                stroke: 'black',
                                strokeWidth: 1,
                                magnet: true
                            }
                        }
                    });

                    rect.attr({
                        body: {
                            fill: 'white',
                            stroke: 'black',
                            strokeWidth: 1
                        },
                        label: {
                            text: name,
                            fill: 'black',
                            'ref-y': classPadding
                        }
                    });

                    // Crea el contenido de la clase
                    var content = [];

                    // Título
                    content.push('---'); // Línea divisoria
                    content.push(name); // Título de la clase
                    content.push('---');

                    // Atributos
                    if (attributes.length > 0) {
                        content.push(attributes.join('\n'));
                    }

                    // Métodos
                    if (methods.length > 0) {
                        if (attributes.length > 0) {
                            content.push('---');
                        }
                        content.push(methods.join('\n'));
                    }

                    // Agrega el contenido al rectángulo de la clase
                    rect.attr({
                        label: {
                            text: content.join('\n'),
                            fill: 'black',
                            'font-size': 12,
                            'ref-y': classPadding,
                            contentEditable: true,
                            'data-type': 'class'
                        }
                    });

                    // Agrega la clase al lienzo
                    graph.addCell(rect);

                    // Ajusta automáticamente el tamaño del rectángulo de la clase al cambiar el contenido
                    rect.on('change:label', function(element, newValue) {
                        var textarea = document.getElementById(rect.id);
                        rect.resize(textarea.scrollWidth, textarea.scrollHeight);
                    });
                }



                // Escucha el evento de doble clic en el contenido editable
                paper.on('cell:pointerdblclick', function(cellView) {
                    var cell = cellView.model;
                    var content = cell.attr('label/text');
                    var type = cell.attr('label/data-type');

                    // Verifica que el elemento sea editable
                    if (type === 'class') {
                        // Crea un campo de entrada de texto para la edición
                        var textarea = document.createElement('textarea');
                        textarea.id = cell.id;
                        textarea.value = content;
                        textarea.style.position = 'absolute';
                        textarea.style.left = cellView.el.getBoundingClientRect().left + 'px';
                        textarea.style.top = cellView.el.getBoundingClientRect().top + 'px';
                        textarea.style.width = cellView.el.getBoundingClientRect().width + 'px';
                        textarea.style.height = cellView.el.getBoundingClientRect().height + 'px';
                        textarea.style.border = 'none';
                        textarea.style.padding = '4px';
                        textarea.style.fontSize = '12px';
                        textarea.style.fontFamily = 'Arial, sans-serif';

                        textarea.addEventListener('input', function() {
                            var originalSize = cell.get('size');
                            var newWidth = Math.max(textarea.scrollWidth + 20, originalSize.width);
                            var newHeight = textarea.scrollHeight - 100;
                            cell.resize(newWidth, newHeight);
                        });

                        textarea.addEventListener('blur', function() {
                            var editedContent = textarea.value;
                            cell.attr('label/text', editedContent);
                            cell.attr('label/fill', 'black');
                            textarea.parentNode.removeChild(textarea);
                        });

                        document.body.appendChild(textarea);
                        textarea.focus();
                    }
                });

                // Función para duplicar la clase de ejemplo inicial
                function duplicateClass() {
                    createClass(100, 100, 'MiClase', ['atributo1: Tipo', 'atributo2: Tipo'], ['+ método1()',
                        '- método2()'
                    ]);
                }

                // Crea una clase de ejemplo inicial
                duplicateClass();

                // Obtén una referencia al botón de duplicar
                var duplicateBtn = document.getElementById('duplicateBtn');

                // Agrega el evento onclick al botón
                duplicateBtn.onclick = function() {
                    duplicateClass();
                };

            });
        </script>
    @endpush
</div>
