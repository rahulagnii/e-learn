<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminParentController extends Controller
{
    public function index()
    {
        $parents = User::join('student_parents', 'users.id', '=', 'student_parents.user_id')->get();
        return Inertia::render('Admin/Parent/List/index', compact('parents'));
    }


    public function create()
    {
        return Inertia::render('Admin/Parent/Add/index');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('driver');
        StudentParent::create([
            'user_id' => $user->id,
            'licence' => $request->licence,
            'phone' => $request->phone,
            'vehicle_number' => $request->vehicle_number,
            'aadhar_id' => $request->aadhar_id,
            'profile_picture' => $request->profile_picture,
            'locality' => $request->locality,
        ]);
        return redirect()->route('admin.parent.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        $parent = StudentParent::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Parent/Edit/index', compact('user', 'parent'));
    }


    public function update(User $user, Request $request)
    {
        $parent = StudentParent::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $parent->licence = $request->licence;
        $parent->phone = $request->phone;
        $parent->vehicle_number = $request->vehicle_number;
        $parent->aadhar_id = $request->aadhar_id;
        $parent->profile_picture = $request->profile_picture;
        $parent->locality = $request->locality;
        $user->update();
        $parent->update();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.parent.index');
    }
}
