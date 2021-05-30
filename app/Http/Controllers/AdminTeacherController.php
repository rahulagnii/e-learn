<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTeacherController extends Controller
{
    public function index()
    {
        $teachers = User::join('teachers', 'users.id', '=', 'teachers.user_id')->get();
        return Inertia::render('Admin/Teacher/List/index', compact('teachers'));
    }


    public function create()
    {
        return Inertia::render('Admin/Teacher/Add/index');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('driver');
        Teacher::create([
            'user_id' => $user->id,
            'licence' => $request->licence,
            'phone' => $request->phone,
            'vehicle_number' => $request->vehicle_number,
            'aadhar_id' => $request->aadhar_id,
            'profile_picture' => $request->profile_picture,
            'locality' => $request->locality,
        ]);
        return redirect()->route('admin.teacher.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        $teacher = Teacher::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Teacher/Edit/index', compact('user', 'teacher'));
    }


    public function update(User $user, Request $request)
    {
        $teacher = Teacher::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $teacher->licence = $request->licence;
        $teacher->phone = $request->phone;
        $teacher->vehicle_number = $request->vehicle_number;
        $teacher->aadhar_id = $request->aadhar_id;
        $teacher->profile_picture = $request->profile_picture;
        $teacher->locality = $request->locality;
        $user->update();
        $teacher->update();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.teacher.index');
    }
}
