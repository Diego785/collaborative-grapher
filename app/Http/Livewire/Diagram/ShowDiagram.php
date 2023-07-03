<?php

namespace App\Http\Livewire\Diagram;

use Livewire\Component;

class ShowDiagram extends Component
{



    public $diagramData, $receivedMessage, $message;


    protected $listeners = ['messageReceived' => 'handleMessageReceived', 'updateDiagram' => 'updateDiagram'];


    //----------------------------- SOCKETS -----------------------------------//
    public function sendMessage()
    {
        // socket->emit('messageSent', $this->message);
        // $this->socket()->emit('messageSent', $this->message);

        // Emitir el evento 'messageSent' al servidor a través de Socket.io
        $this->emit('messageSent', $this->message);
        $this->message = '';
        // dd('Mensaje enviado desde el cliente:', $this->message);

    }

    public function handleMessageReceived($message)
    {
        // Maneja el mensaje recibido del servidor de sockets
        // Asigna el mensaje a una propiedad de Livewire
        $this->receivedMessage = $message;
        $this->emit('messageReceived', $message);
    }

    //------------------------------------------------------------------------//


    public function updateDiagram()
    {
        // Emitir el evento 'updateDiagram' al servidor a través de Socket.io
        $this->emit('updateDiagram', $this->diagramData);
    }

    public function mount()
    {
        // Inicializar el diagrama y suscribirse a eventos
        $this->dispatchBrowserEvent('initializeDiagram');
    }

    public function updated($propertyName)
    {
        $this->resetValidation($propertyName);
    }

    public function render()
    {

        return view('livewire.diagram.show-diagram');
    }
}
