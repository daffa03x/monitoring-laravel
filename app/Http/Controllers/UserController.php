<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
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
    }

    public function changePerPage(Request $request)
    {
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
    }
    
    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            'password_confirmation' => 'same:password',
            'role' => 'required'
        ]);
        $data['password'] = Hash::make($data['password']);
        User::create($data);
        return redirect()->route('user.index')->with('success', 'User Created Successfully');
    }

    public function edit($id)
    {
        $user = User::find($id);
        return Inertia::render('Admin/User/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|in:admin,approver',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role,
        ]);

        return redirect()->route('user.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('user.index')->with('success', 'User deleted successfully.');
    }
}
