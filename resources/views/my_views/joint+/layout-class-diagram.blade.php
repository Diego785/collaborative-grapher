<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="The JointJS+ Kitchen Sink application serves as a template to help bring your idea to life in no time.">
    <title>JointJS+ KitchenSink Application</title>
    <link rel="icon" href="{{ asset('joint/favicon.ico') }}" type="image/x-icon" />
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @livewireStyles
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/build/package/rappid.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/css/style.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/css/theme-picker.css') }}">

    <!-- theme-specific application CSS  -->
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/css/style.dark.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/css/style.material.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('joint/css/style.modern.css') }}">

</head>

<body>

    <div id="app">
        <div class="app-header">
            <div class="app-title">
                <h1>JointJS+</h1>
            </div>
            <div class="toolbar-container"></div>
        </div>
        @yield('script')
        <div class="app-body">

            <div class="stencil-container"></div>
            <div class="paper-container"></div>
            <div class="inspector-container"></div>
            <div class="navigator-container"></div>

        </div>
    </div>





    <!-- JointJS+ dependencies: -->
    <script src="{{ asset('joint/node_modules/jquery/dist/jquery.js') }}"></script>
    <script src="{{ asset('joint/node_modules/lodash/lodash.js') }}"></script>
    <script src="{{ asset('joint/node_modules/backbone/backbone.js') }}"></script>
    <script src="{{ asset('joint/node_modules/graphlib/dist/graphlib.core.js') }}"></script>
    <script src="{{ asset('joint/node_modules/dagre/dist/dagre.core.js') }}"></script>


    <script src="{{ asset('joint/build/package/rappid.js') }}"></script>

    <!--[if IE 9]>
        <script>
            // `-ms-user-select: none` doesn't work in IE9
            document.onselectstart = function() {
                return false;
            };
        </script>
    <![endif]-->






    <script src="socket.io/socket.io.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.2/socket.io.js"></script>


    <script>
        window.addEventListener('livewire:load', () => {
            var socket = io('http://localhost:3001');

            socket.on('connect', () => {
                console.log('Conexión establecida');
            });

            socket.on('disconnect', () => {
                console.log('Desconectado');
            });
        });
    </script>



    <script src="{{ asset('joint/js/config/halo.js') }}"></script>
    <script src="{{ asset('joint/js/config/selection.js') }}"></script>
    <script src="{{ asset('joint/js/config/inspector.js') }}"></script>
    <script src="{{ asset('joint/js/config/stencil.js') }}"></script>
    <script src="{{ asset('joint/js/config/toolbar.js') }}"></script>
    <script src="{{ asset('joint/js/config/sample-graphs.js') }}"></script>
    {{-- <script src="{{ asset('joint/js/views/main.js') }}"></script> --}}

    <script src="{{ asset('joint/js/views/theme-picker.js') }}"></script>
    <script src="{{ asset('joint/js/models/joint.shapes.app.js') }}"></script>
    <script src="{{ asset('joint/js/views/navigator.js') }}"></script>

    <script src="{{ mix('js/app.js') }}"></script>
    @yield('content')

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer></script>

    @livewireScripts
    @stack('js')

    <script>
        document.addEventListener('livewire:load', function() {

            joint.setTheme('modern');
            app = new App.MainView({
                el: '#app'
            });
            themePicker = new App.ThemePicker({
                mainView: app
            });
            themePicker.render().$el.appendTo(document.body);
            window.addEventListener('load', function() {
                app.graph.fromJSON(JSON.parse(App.config.sampleGraphs.emergencyProcedure));
            });
        });
    </script>




    <!-- Local file warning: -->
    <div id="message-fs" style="display: none;">
        <p>The application was open locally using the file protocol. It is recommended to access it trough a <strong>Web
                server</strong>.</p>
        <p>Please see <a href="{{ asset('README.md') }}">instructions</a>.</p>
    </div>
    <script>
        (function() {
            var fs = (document.location.protocol === 'file:');
            var ff = (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1);
            if (fs && !ff) {
                (new joint.ui.Dialog({
                    width: 300,
                    type: 'alert',
                    title: 'Local File',
                    content: $('#message-fs').show()
                })).open();
            }
        })();
    </script>






</body>

</html>
