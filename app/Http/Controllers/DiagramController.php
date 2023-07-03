<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class DiagramController extends Controller
{
    public function index()
    {
        return view('my_views.diagrams.show-diagrams');
    }

    public function show()
    {
        return view('my_views.diagrams.diagram-class');
    }

    public function show_cruds()
    {
        return view('my_views.diagrams.show-cruds');
    }
    public function download_crud()
    {
        $rutaArchivo = public_path('downloads/archivo.html');
        $headers = ['Content-Type: text/html'];

        return Response::download($rutaArchivo, 'archivo.html', $headers);
    }
}
