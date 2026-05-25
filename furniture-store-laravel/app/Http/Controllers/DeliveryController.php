<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Events\LocationUpdated;
use App\Models\Delivery;
use App\Models\Driver_location;

class DeliveryController extends Controller
{
    public function driver($id)
    {
        $driver = Delivery::join("users","users.id","=","deliveries.driver_id")
        ->select("*")
        ->where("order_id",$id)
        ->get();

        return response()->json($driver);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        Delivery::create([
            'order_id' => $request->order_id,
            'driver_id' => $request->driver_id
        ]);
        $delivery = [];
        $delivery = DB::select("select * from deliveries order by created_at desc");
        return response()->json($delivery[0]);
    }

    public function show()
    {
        //
    }

    public function latestLocation($id)
    {
        $delivery = Delivery::where("order_id",$id)->latest()->get();

    if (!$delivery) {
        return response()->json([
            'success' => false,
            'message' => 'The request was not found.'
        ], 404);
    }

    $deliveryId = $delivery[0]->id;

    $latestLocation = Driver_location::where('delivery_id', $deliveryId)
        ->latest() 
        ->first();

    if (!$latestLocation) {
        return response()->json([
            'success' => false,
            'message' => 'No location currently available.'
        ], 204); 
    }

    return response()->json([
        'success' => true,
        'location' => [
            'id' => $latestLocation->id,
            'latitude' => (float) $latestLocation->latitude,
            'longitude' => (float) $latestLocation->longitude,
            'created_at' => $latestLocation->created_at->toDateTimeString(),
        ]
    ]);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $location = Driver_location::create([
            'delivery_id' => $id,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        event(new LocationUpdated($location));

        return response()->json(['success'=>true,'location'=>$location]);
    }

    public function destroy(string $id)
    {
        //
    }
}
