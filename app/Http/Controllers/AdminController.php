<?php

namespace App\Http\Controllers;


use App\Models\Student;
use App\Models\StudentParent;
use App\Models\Teacher;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $teachers = Teacher::all()->count();
        $students = Student::all()->count();
        $parents = StudentParent::all()->count();
        return Inertia::render('Admin/index', compact('teachers', 'students', 'parents'));
    }
}
