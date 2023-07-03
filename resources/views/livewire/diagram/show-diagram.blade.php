<div>
    <div>
        <div id="canvas">
        </div>
    </div>

    <!-- component -->
    <button id="duplicateBtn"
        class="group rounded-2xl h-12 w-48 bg-blue-900 font-bold text-lg text-white relative overflow-hidden">
        Crear Clase
        <div
            class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl">
        </div>
    </button>

    {{-- <div>
        <input type="text" wire:model="message" placeholder="Escribe tu mensaje">
        <a wire:click="sendMessage">Enviar</a>
    </div>
    <div>
        <p>Mensaje recibido: {{ $receivedMessage }}</p>
    </div> --}}


    @push('js')
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.2/socket.io.js"></script>
        <script>
            document.addEventListener('livewire:load', function() {
                // Establecer la conexión de Socket.io con el servidor
                var socket = io('http://localhost:3001');

                // Emitir el evento 'messageSent' al servidor cuando se envía el mensaje
                // desde mi controlador de Livewire

                // Livewire.on('messageSent', function(message) {
                //     socket.emit('messageSent', message);
                // });

                // Emitir el evento 'messageSent' al servidor cuando se envía el mensaje
                // desde mi vista de Livewire
                socket.emit('messageSent', {
                    nombre: 'Diego Hutado Vargas'
                });

                socket.on('messageReceived', function(message) {
                    console.log('Mensaje recibido en el cliente: ', message);
                });


            });
        </script>
        <script>
            document.addEventListener('livewire:load', function() {
                var socket = io('http://localhost:3001');

                // Livewire.emit('updateDiagram', data);
                // Obtén una referencia al elemento de lienzo
                var canvas = document.getElementById('canvas');

                // Crea un nuevo lienzo de JointJS
                var graph = new joint.dia.Graph();
                var elementId = 1000;
                console.log(elementId);

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


                    // Generar un ID único para el elemento
                    // function generateUniqueId() {
                    //     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
                    // }



                    // Crea el rectángulo de la clase
                    var rect = new joint.shapes.standard.Rectangle({
                        id: elementId,
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

                    // Agrega los puertos de conexión a la clase
                    rect.addPort({
                        group: 'in',
                        id: 'in-port'
                    });
                    rect.addPort({
                        group: 'out',
                        id: 'out-port'
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

                socket.on('elementMoved', function(data) {
                    console.log('Recibiendo el nuevo movimiento del cuadro de la clase.')
                    console.log(data);
                    // Busca el elemento en el diagramador por su ID
                    var element = graph.getCell(data.id);

                    // Verifica que el elemento exista
                    if (element) {
                        // Actualiza la posición del elemento en el diagramador
                        element.position(data.x, data.y);
                    } else {
                        console.log('No existe el elemento!');
                    }
                });

                socket.on('connectionCreated', function(connectionData) {
                    console.log('Nueva conexión creada:', connectionData);

                    // Obtén los IDs de las clases de origen y destino de la conexión
                    var sourceId = connectionData.sourceId;
                    var targetId = connectionData.targetId;

                    // Encuentra las celdas correspondientes a las clases de origen y destino
                    var sourceCell = graph.getCell(sourceId);
                    var targetCell = graph.getCell(targetId);

                    // Crea una nueva conexión en el diagrama entre las celdas encontradas
                    var connection = new joint.dia.Link({
                        source: {
                            id: sourceCell.id
                        },
                        target: {
                            id: targetCell.id
                        }
                    });

                    // Agrega la nueva conexión al grafo
                    graph.addCell(connection);

                });



                paper.on('cell:pointermove', function(cellView, evt, x, y) {
                    var cell = cellView.model;

                    // Obtén la posición actualizada del elemento
                    var position = cell.get('position');

                    // Emite la información del elemento movido al servidor
                    socket.emit('elementMoved', {
                        id: cell.id,
                        x: position.x,
                        y: position.y
                    });
                });

                // Escucha el evento de conexión de las líneas de conexión
                paper.on('link:connect', function(linkView) {
                    var sourceId = linkView.model.get('source').id;
                    var targetId = linkView.model.get('target').id;
                    var connectionData = {
                        sourceId: sourceId,
                        targetId: targetId
                    };

                    console.log('Conectado:', sourceId, '->', targetId);


                    // Envía la información de conexión al servidor de Socket.IO
                    socket.emit('connectingClass', connectionData);
                });


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


                        socket.emit('editContent', textarea.value);
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

                //Socket para crear una clase en tiempo real
                socket.on('creatingClass', function(data) {
                    console.log('Recibiendo la creación de una nueva la clase.');
                    var classWidth = 100;
                    var classHeight = 100;
                    var classPadding = 10;
                    var name = 'MiClase';
                    var attributes = ['atributo1: Tipo', 'atributo2: Tipo'];
                    var methods = ['+ método1()', '- método2()'];

                    // Generar un ID único para el elemento
                    // function generateUniqueId() {
                    //     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
                    // }



                    // Crea el rectángulo de la clase
                    var rect = new joint.shapes.standard.Rectangle({
                        id: data.elementId,
                        position: {
                            x: 100,
                            y: 100
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

                    // Agrega los puertos de conexión a la clase
                    rect.addPort({
                        group: 'in',
                        id: 'in-port'
                    });
                    rect.addPort({
                        group: 'out',
                        id: 'out-port'
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
                });



                // Obtén una referencia al botón de duplicar
                var duplicateBtn = document.getElementById('duplicateBtn');

                // Agrega el evento onclick al botón
                duplicateBtn.onclick = function() {


                    //Recorremos todos los IDS de las clases
                    // Recorre todas las celdas en el diagramador y encuentra el ID más alto
                    elementId = graph.getCells().reduce(function(maxId, cell) {
                        // Verifica si la celda es una clase y actualiza el ID más alto si es necesario
                        if (cell instanceof joint.shapes.standard.Rectangle) {
                            return Math.max(maxId, cell.id);
                        }
                        return maxId;
                    }, 0);
                    elementId = elementId + 1;


                    duplicateClass();
                    socket.emit('duplicateClass', {
                        elementId: elementId,
                        // attibutes: ['atributo1: Tipo', 'atributo2: Tipo'],
                        // methods: ['+ método1()', '- método2()'],
                    });
                };

            });
        </script>
    @endpush
</div>
