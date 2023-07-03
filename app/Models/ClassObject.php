<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassObject extends Model
{
    use HasFactory;
    protected $table = 'class_objects';
    protected $fillable = ['id', 'code', 'name', 'attributes', 'tipos_datos', 'long_datos', 'nullable_datos', 'methods', 'foreing_keys', 'foreing_keys_class'];
    public $timestamps = false;


}
