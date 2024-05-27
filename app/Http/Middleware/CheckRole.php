<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next,string $role)
    {
        // Pastikan pengguna sudah login
        if (!Auth::check()) {
            return redirect('/');
        }

        // Cek apakah pengguna memiliki role yang sesuai
        $user = Auth::user();
        if ($user->role !== $role) {
            return redirect('dashboard')->with('error', 'You do not have access to this page.');
        }

        return $next($request);
    }
}
