<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 5); // Default perPage 5
        $page = $request->input('page', 1);
        $search = $request->input('search', ''); 

        // Query untuk mencari data vehicle berdasarkan plate
        $vehicleQuery = Vehicle::query();
        if ($search) {
            $vehicleQuery->where('license_plate', 'LIKE', "%{$search}%");
        }

        $total = $vehicleQuery->count();

        $data = $vehicleQuery->latest()->offset(($page - 1) * $perPage)->limit($perPage)->get();

        Log::info('Berhasil Get Data Vehicle');
        return Inertia::render('Admin/Vehicle/Index', [
            'data' => $data,
            'totalPages' => ceil($total / $perPage),
            'currentPage' => $page,
            'perPage' => $perPage,
            'total' => $total,
            'search' => $search
        ]);
    }

    public function changePerPage(Request $request)
    {
        $perPage = $request->input('perPage', 5); // Default perPage 5
        $page = $request->input('page', 1);
        $search = $request->input('search', ''); 
        $offset = ($page - 1) * $perPage;

        // Query data vehicle dengan limit, offset, dan filter pencarian
        $vehicleQuery = Vehicle::query();
        if ($search) {
            $vehicleQuery->where('name', 'LIKE', "%{$search}%");
        }
        
        $data = $vehicleQuery->latest()->offset($offset)->limit($perPage)->get();

        $total = $vehicleQuery->count();

        $totalPages = ceil($total / $perPage);

        return response()->json([
            'data' => $data,
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'total' => $total,
            'search' => $search 
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Vehicle/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'license_plate' => 'required',
            'owner' => 'required',
            'type' => 'required',
            'fuel_capacity' => 'required',
        ]);
        Vehicle::create($data);
        return redirect()->route('vehicle.index')->with('success', 'Vehicle Created Successfully');
    }

    public function edit($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        return Inertia::render('Admin/Vehicle/Edit', [
            'vehicle' => $vehicle
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'license_plate' => 'required',
            'owner' => 'required',
            'type' => 'required',
            'fuel_capacity' => 'required',
        ]);
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->update($data);
        return redirect()->route('vehicle.index')->with('success', 'Vehicle Updated Successfully');
    }

    public function destroy($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->delete();
        return redirect()->route('vehicle.index')->with('success', 'Vehicle deleted successfully.');
    }   
}