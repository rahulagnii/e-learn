<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStudentController extends Controller
{
    public function index()
    {
        $students = User::join('students', 'users.id', '=', 'students.user_id')->get();
        return Inertia::render('Admin/Student/List/index', compact('students'));
    }


    public function create()
    {
        return Inertia::render('Admin/Student/Add/index');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('driver');
        Student::create([
            'user_id' => $user->id,
            'licence' => $request->licence,
            'phone' => $request->phone,
            'vehicle_number' => $request->vehicle_number,
            'aadhar_id' => $request->aadhar_id,
            'profile_picture' => $request->profile_picture,
            'locality' => $request->locality,
        ]);
        return redirect()->route('admin.student.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        $student = Student::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Student/Edit/index', compact('user', 'student'));
    }


    public function update(User $user, Request $request)
    {
        $student = Student::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $student->licence = $request->licence;
        $student->phone = $request->phone;
        $student->vehicle_number = $request->vehicle_number;
        $student->aadhar_id = $request->aadhar_id;
        $student->profile_picture = $request->profile_picture;
        $student->locality = $request->locality;
        $user->update();
        $student->update();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.student.index');
    }
}
