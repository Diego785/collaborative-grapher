<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiagramController extends Controller
{
    public function index(){
        return view('my_views.diagrams.show-diagrams');
    }
}
