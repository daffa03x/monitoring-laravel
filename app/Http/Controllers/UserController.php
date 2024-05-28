<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        try {
            $perPage = $request->input('perPage', 5); // Default perPage 5
            $page = $request->input('page', 1);
            $search = $request->input('search', ''); 
    
            // Query untuk mencari data user berdasarkan nama
            $usersQuery = User::query();
            if ($search) {
                $usersQuery->where('name', 'LIKE', "%{$search}%");
            }
    
            $total = $usersQuery->count();

            $data = $usersQuery->latest()->offset(($page - 1) * $perPage)->limit($perPage)->get();
    
            Log::info('Berhasil Get Data User');
            return Inertia::render('Admin/User/Index', [
                'data' => $data,
                'totalPages' => ceil($total / $perPage),
                'currentPage' => $page,
                'perPage' => $perPage,
                'total' => $total,
                'search' => $search
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return Inertia::render();
        }
    }

    public function changePerPage(Request $request)
    {
        try {
            $perPage = $request->input('perPage', 5); // Default perPage 5
            $page = $request->input('page', 1);
            $search = $request->input('search', ''); 
            $offset = ($page - 1) * $perPage;
    
            // Query data users dengan limit, offset, dan filter pencarian
            $usersQuery = User::query();
            if ($search) {
                $usersQuery->where('name', 'LIKE', "%{$search}%");
            }
            
            $data = $usersQuery->latest()->offset($offset)->limit($perPage)->get();
    
            $total = $usersQuery->count();
    
            $totalPages = ceil($total / $perPage);
    
            return response()->json([
                'data' => $data,
                'currentPage' => $page,
                'totalPages' => $totalPages,
                'total' => $total,
                'search' => $search 
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return Inertia::render();
        }
    }
    
    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }
}
