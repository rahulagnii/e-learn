<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDepartmentController extends Controller
{

    public function index()
    {
        $departments = Department::all();
        return Inertia::render('Admin/Department/index', compact('departments'));
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        Department::create($request->all());
        return redirect()->route("admin.department.index");
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, Department $department)
    {
        $department->update($request->all());
        return redirect()->route("admin.department.index");
    }


    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route("admin.department.index");
    }
}
