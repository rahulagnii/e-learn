<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminStudentController;
use App\Http\Controllers\AdminParentController;
use App\Http\Controllers\AdminTeacherController;
use App\Http\Controllers\AccidentController;
use App\Http\Controllers\AdminCourseController;
use App\Http\Controllers\AdminDepartmentController;
use App\Http\Controllers\AdminSemesterController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Auth;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Auth::routes([
    'register' => false
]);

Route::group(['middleware' => ['role:admin']], function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');

    Route::get('/admin/teacher', [AdminTeacherController::class, 'index'])->name('admin.teacher.index');
    Route::get('/admin/teacher/create', [AdminTeacherController::class, 'create'])->name('admin.teacher.create');
    Route::post('/admin/teacher', [AdminTeacherController::class, 'store'])->name('admin.teacher.store');
    Route::get('/admin/teacher/{user}/edit', [AdminTeacherController::class, 'edit'])->name('admin.teacher.edit');
    Route::put('/admin/teacher/{user}', [AdminTeacherController::class, 'update'])->name('admin.teacher.update');
    Route::delete('/admin/teacher/{user}', [AdminTeacherController::class, 'destroy'])->name('admin.teacher.destroy');

    Route::get('/admin/student', [AdminStudentController::class, 'index'])->name('admin.student.index');
    Route::get('/admin/student/create', [AdminStudentController::class, 'create'])->name('admin.student.create');
    Route::post('/admin/student', [AdminStudentController::class, 'store'])->name('admin.student.store');
    Route::get('/admin/student/{user}/edit', [AdminStudentController::class, 'edit'])->name('admin.student.edit');
    Route::put('/admin/student/{user}', [AdminStudentController::class, 'update'])->name('admin.student.update');
    Route::delete('/admin/student/{user}', [AdminStudentController::class, 'destroy'])->name('admin.student.destroy');



    Route::get('/admin/parent', [AdminParentController::class, 'index'])->name('admin.parent.index');
    Route::get('/admin/parent/create', [AdminParentController::class, 'create'])->name('admin.parent.create');
    Route::post('/admin/parent', [AdminParentController::class, 'store'])->name('admin.parent.store');
    Route::get('/admin/parent/{user}/edit', [AdminParentController::class, 'edit'])->name('admin.parent.edit');
    Route::put('/admin/parent/{user}', [AdminParentController::class, 'update'])->name('admin.parent.update');
    Route::delete('/admin/parent/{user}', [AdminParentController::class, 'destroy'])->name('admin.parent.destroy');



    Route::get('/admin/department', [AdminDepartmentController::class, 'index'])->name('admin.department.index');
    Route::post('/admin/department', [AdminDepartmentController::class, 'store'])->name('admin.department.store');
    Route::put('/admin/department/{department}', [AdminDepartmentController::class, 'update'])->name('admin.department.update');
    Route::delete('/admin/department/{department}', [AdminDepartmentController::class, 'destroy'])->name('admin.department.destroy');

    Route::get('/admin/course', [AdminCourseController::class, 'index'])->name('admin.course.index');
    Route::post('/admin/course', [AdminCourseController::class, 'store'])->name('admin.course.store');
    Route::put('/admin/course/{course}', [AdminCourseController::class, 'update'])->name('admin.course.update');
    Route::delete('/admin/course/{course}', [AdminCourseController::class, 'destroy'])->name('admin.course.destroy');

    Route::get('/admin/semester', [AdminSemesterController::class, 'index'])->name('admin.semester.index');
    Route::post('/admin/semester', [AdminSemesterController::class, 'store'])->name('admin.semester.store');
    Route::put('/admin/semester/{semester}', [AdminSemesterController::class, 'update'])->name('admin.semester.update');
    Route::delete('/admin/semester/{semester}', [AdminSemesterController::class, 'destroy'])->name('admin.semester.destroy');
});



Route::group(['middleware' => ['role:teacher']], function () {
    Route::get('/teacher', [TeacherController::class, 'index'])->name('teacher.index');

    Route::get('/teacher/notification', [AccidentController::class, 'index'])->name('teacher.notification.index');
    Route::post('/teacher/notification', [AccidentController::class, 'store'])->name('teacher.notification.store');
    Route::get('/teacher/notification/create', [AccidentController::class, 'create'])->name('teacher.notification.create');
    Route::get('/teacher/notification/{accident}/edit', [AccidentController::class, 'edit'])->name('teacher.notification.edit');
    Route::put('/teacher/notification/{accident}', [AccidentController::class, 'update'])->name('teacher.notification.update');
    Route::delete('/teacher/notification/{accident}', [AccidentController::class, 'destroy'])->name('teacher.notification.destroy');

    Route::get('/teacher/student/list', [TeacherController::class, 'studentList'])->name('teacher.student.list');
    Route::get('/teacher/pending-accident/{student}/{accident}/view', [TeacherController::class, 'pendingView'])->name('teacher.pending.view');
    Route::get('/teacher/pending-accident/list', [TeacherController::class, 'pendingList'])->name('teacher.pending.list');
    Route::put('/teacher/reject-accident/{student}', [TeacherController::class, 'reject'])->name('teacher.reject');
    Route::put('/teacher/approve-accident/{student}', [TeacherController::class, 'approve'])->name('teacher.approve');
    Route::get('/teacher/approved-accident', [TeacherController::class, 'approvedView'])->name('teacher.approved.view');
});

Route::get('/user/register', [StudentController::class, 'register'])->name('user.register');
Route::post('/user/register', [StudentController::class, 'store'])->name('user.store');
Route::group(['middleware' => ['role:student']], function () {
    Route::get('/student', [StudentController::class, 'index'])->name('student.index');
    Route::put('/student/profile/{student}', [StudentController::class, 'profile'])->name('student.profile');
    Route::put('/student/profile/{student}', [StudentController::class, 'update'])->name('student.update');
    Route::get('/student/notification', [StudentController::class, 'notification'])->name('student.notification');
    Route::get('/student/notification/{accident}/view', [StudentController::class, 'notificationView'])->name('student.notification.view');
    Route::get('/student/accident/status', [StudentController::class, 'status'])->name('student.accident.status');
    Route::post('/student/accident/apply', [StudentController::class, 'apply'])->name('student.notification.apply');
});
