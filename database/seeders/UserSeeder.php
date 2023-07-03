<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Diego Hurtado Vargas',
            'email' => 'Diego@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Camila Velarde',
            'email' => 'Camila@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
    }
}
