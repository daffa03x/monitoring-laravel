<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): Response
    {
        try {
            $data = User::latest()->get();
            Log::info('Berhasil Get Data User');
            return Inertia::render('Admin/User/Index',[
                'data' => $data
            ]); 
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return Inertia::render();
        }
    }
}
