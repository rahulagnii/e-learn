<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin']);
        $teacher = Role::create(['name' => 'teacher']);
        $student = Role::create(['name' => 'student']);
        $parent = Role::create(['name' => 'parent']);

        $superAdmin = User::factory()->create([
            'name' => 'Sreelekshmi R',
            'email' => 'admin@app.com',
            'password' => \bcrypt('password'),
        ]);
        $superAdmin->assignRole($admin);
    }
}
