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
        $this->emit('messageSent', $this->message);
        // dd('Mensaje enviado desde el cliente:', $this->message);

        $this->message = '';
    }

    public function handleMessageReceived($message)
    {
        // Maneja el mensaje recibido del servidor de sockets
        // Asigna el mensaje a una propiedad de Livewire
        $this->receivedMessage = $message;
    }

    //------------------------------------------------------------------------//


    public function updateDiagram($data)
    {
        $this->diagramData = $data;
    }

    public function updatedDiagramData()
    {
        $this->dispatchBrowserEvent('updateDiagram', $this->diagramData);
    }

    public function mount()
    {
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
