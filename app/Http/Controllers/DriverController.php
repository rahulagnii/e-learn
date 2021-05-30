<?php

namespace App\Http\Controllers;

use App\Models\Accident;
use App\Models\AccidentDriverStatus;
use App\Models\Client;
use App\Models\Driver;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function index()
    {

        $accidents = Accident::all()->count();
        $hostpitals = Hospital::where('availability', '=', true)->get()->count();
        return Inertia::render('Driver/index', compact('accidents', 'hostpitals'));
    }


    public function notification()
    {
        $notifications = Accident::where('status', false)->get();
        return Inertia::render('Driver/Notification/List/index', compact('notifications'));
    }


    public function notificationView(Accident $accident)
    {
        return Inertia::render('Driver/Notification/View/index', compact('accident'));
    }


    public function apply(Request $request)
    {
        AccidentDriverStatus::create([
            'driver_id' => Auth::user()->driver->id,
            'accident_id' => $request->accident_id,
        ]);
        return redirect()->route('driver.notification');
    }

    public function status()
    {
        $status = AccidentDriverStatus::where('driver_id', Auth::user()->driver->id)->join('accidents', 'accident_driver_statuses.accident_id', '=', 'accidents.id')->get();
        return Inertia::render('Driver/Status/List/index', compact('status'));
    }

    public function profile(Request $request, Driver $driver)
    {
        $driver->update($request->all());
        return redirect()->back();
    }

    public function changePassword(Request $request, User $user)
    {
        $user->update($request->all());
        return redirect()->back();
    }
}
