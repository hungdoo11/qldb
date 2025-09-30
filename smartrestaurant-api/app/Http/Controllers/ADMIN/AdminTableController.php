<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;

class AdminTableController extends Controller
{
   
    public function index()
    {
        $tables = Table::all();
        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|max:255',
            'capacity' => 'required|integer', // đổi thành integer
            'status' => 'required|string',
        ]);

        $table = Table::create($validated);

        return response()->json($table, 201);
    }
  
    public function show($id)
    {
        $table = Table::find($id);
        return response()->json($table);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|max:255',
            'capacity' => 'required|integer',
            'status' => 'required|string',
        ]);

        $table = Table::findOrFail($id);
        $table->update($validated);

        return response()->json($table);
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();

        return response()->json(null, 204);
    }
}
