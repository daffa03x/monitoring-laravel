<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i = 1; $i <= 50; $i++) {
            Vehicle::create([
                'license_plate' => 'ABC123'.$i,
                'type' => 'passenger',
                'owner' => 'cargo',
                'fuel_capacity' => 50
            ]);
        }
    }
}
