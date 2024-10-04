<?php

namespace App\Http\Livewire\Diagram;

use App\Models\ClassObject;
use Livewire\Component;

class DiagramClass extends Component
{
    protected $listeners = ['save_class', 'open_modal_pgsql', 'show_cruds', 'countClasses', 'handleOptionClick', 'changeLong', 'changeNull', 'clear', 'select_relation', 'connectedClasses'];

    public $open_modal_script = false;
    public $open_modal_script_edit = false;
    public $open_modal_cruds = false;
    public $open_modal_relations = false;
    public $type = "";
    public $countClasses = 0;
    public $countIndex = 0;
    public $tipo_dato;

    public $relation = "association";

    //Para almacenar la clase principal
    public $object_class;

    //Para almacenar los datos y los tipos de datos
    public $tipos_datos = [];
    public $long_datos = [];
    public $nullable_datos = [];

    //Para almacenar las foreing keys
    public $value = [];
    public $value_foreing_key_class = [];





    public function open_modal_pgsql($type)
    {

        $this->open_modal_script_edit = false;
        $this->open_modal_script = true;
        $this->type = $type;
    }
    public function open_modal_scripts()
    {
        $this->open_modal_script_edit = false;
        $this->open_modal_script = true;
    }

    public function open_pgsql_edit_modal()
    {
        $this->open_modal_script = false;
        $this->open_modal_script_edit = true;
    }





    public function show_cruds()
    {
        $this->object_class = ClassObject::all();
        $this->open_modal_cruds = true;
    }

    public function select_relation()
    {
        $this->open_modal_relations = true;
    }
    public function updateRelation($newValue)
    {

        $this->emit('updateRelation', $newValue);
        $this->open_modal_relations = false;
    }

    public function connectedClasses($sourceId, $targetId)
    {
        $classForeing = ClassObject::where('code', $targetId)->first();
        
        if($classForeing == null){
            // dd('Clase nula. Guarda la clase del diagrama antes de relacionarlo.');
        }
        $foreignKey = strtolower($classForeing->name) . "_id";

        $classMain = ClassObject::where('code', $sourceId)->first();

        if($classMain == null){
            // dd('Clase nula. Guarda la clase del diagrama antes de relacionarlo.');
        }


        if ($classMain->foreing_keys == null) {
            $this->value = [];
            $this->value_foreing_key_class = [];
        } else {
            $this->value = json_decode($classMain->foreing_keys, true);
            $this->value_foreing_key_class = json_decode($classMain->foreing_keys_class, true);
        }

        array_push($this->value, $foreignKey);
        array_push($this->value_foreing_key_class, $classForeing->name);

        if ($classMain->foreing_keys == null) {
            $classMain->foreing_keys = json_encode($this->value);
            $classMain->foreing_keys_class = json_encode($this->value_foreing_key_class);
        } else {
            $classMain->foreing_keys = $this->value;
            $classMain->foreing_keys_class = $this->value_foreing_key_class;
        }
        $classMain->update();
    }



    public function clear()
    {
        $this->object_class = ClassObject::all();
        $this->open_modal_cruds = true;
    }



    public function handleOptionClick($code, $index, $value)
    {
        $this->tipos_datos[$index] = $value;
        // dd($this->object_class);
        $this->object_class = ClassObject::find($code);
        // dd($code);
        $this->object_class->tipos_datos = $this->tipos_datos;

        $this->object_class->update();
    }

    public function changeLong($code, $index, $value)
    {
        $this->long_datos[$index] = $value;
        $this->object_class = ClassObject::find($code);
        $this->object_class->long_datos = $this->long_datos;
        $this->object_class->update();
    }

    public function changeNull($code, $index, $value)
    {
        if ($value == true) {
            $this->nullable_datos[$index] = "NOT NULL";
        } else {
            $this->nullable_datos[$index] = '';
        }
        $this->object_class = ClassObject::find($code);
        $this->object_class->nullable_datos = $this->nullable_datos;
        $this->object_class->update();
    }


    public function save_class($data)
    {
        $code = $data['code']; //String
        $class = $data['class']; //String
        $attributes = $data['attributes']; //Array

        $methods = $data['methods']; //Array
        $this->object_class = ClassObject::where('code', $code)->first();

        if ($this->object_class == null) {

            $this->tipos_datos = $attributes;
            $this->long_datos = $attributes;
            $this->nullable_datos = $attributes;
            for ($i = 0; $i < sizeof($this->tipos_datos); $i++) {
                $this->tipos_datos[$i] = "";
                $this->long_datos[$i] = "";
                $this->nullable_datos[$i] = "";
            }
            try {
                ClassObject::create([
                    'code' => $code,
                    'name' => $class,
                    'attributes' => json_encode($attributes),
                    'tipos_datos' => json_encode($this->tipos_datos),
                    'long_datos' => json_encode($this->long_datos),
                    'nullable_datos' => json_encode($this->nullable_datos),
                    'methods' => json_encode($methods),
                ]);
            } catch (\Throwable $th) {
                dd('Error al guardar datos.');
            }
        } else {
            $difference = sizeof($attributes) - sizeof($this->tipos_datos);
            for ($i = 0; $i < $difference; $i++) {
                array_push($this->tipos_datos, "");
                array_push($this->long_datos, "");
                array_push($this->nullable_datos, "");
            }
            $this->object_class->name = $class;
            $this->object_class->attributes = $attributes;
            $this->object_class->tipos_datos = $this->tipos_datos;
            $this->object_class->long_datos = $this->long_datos;
            $this->object_class->nullable_datos = $this->nullable_datos;
            $this->object_class->methods = $methods;
            $this->object_class->update();
        }
        $object_class = null;
    }



    public function countClasses()
    {
        $this->countClasses++;
    }


    public function render()
    {
        $classes = ClassObject::all();
        return view('livewire.diagram.diagram-class', compact('classes'));
    }
}
