<?php

namespace App\Http\Livewire\Diagram;

use Livewire\Component;

class ShowCruds extends Component
{



    public function view_cruds()
    {
        dd('show cruds');
        return redirect()->to('/show-cruds');
    }

    public function render()
    {
        return view('livewire.diagram.show-cruds');
    }
}
