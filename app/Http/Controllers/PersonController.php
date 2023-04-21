<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Models\Person;
use Exception;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $persons = Person::all();
        return view('persons', compact('persons'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:100',
                'lastname' => 'required|string|max:300',
                'doc' => 'required|integer',
            ]);

            $person = Person::create([
                'name' => $request->input('name'),
                'lastname' => $request->input('lastname'),
                'doc' => $request->input('doc'),
            ]);

            return response()->json([
                'success' => true,
                'data' => 'Succefully saved',
                'id' => $person->id
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, Person $person)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:100',
                'lastname' => 'required|string|max:300',
                'doc' => 'required|integer',
            ]);
            $person->update([
                'name' => $request->string('name'),
                'lastname' => $request->string('lastname'),
                'doc' => $request->string('doc'),
            ]);

            return response()->json([
                'success' => true,
                'data' => 'Succefully updated',
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'data' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        $person->delete();

        return response()->json([
            'success' => true,
            'data' => 'Succefully deleted',
        ]);
    }
}
