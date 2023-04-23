<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function index()
    {
        return view('calculator');
    }

    public function sum(Request $request)
    {
        $numberA = $request->input("inputNumberA");
        $numberB = $request->input("inputNumberB");

        $sum = $numberA + $numberB;

        return response()->json([
            'success' => true,
            'data' => '7'
        ]);
    }
}
