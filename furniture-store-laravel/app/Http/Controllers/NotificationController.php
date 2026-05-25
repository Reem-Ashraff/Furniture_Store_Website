<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {
        
    }

    public function show($id)
    {
        $notifications = Notification::where("user_id",$id)
        ->select("*")
        ->orderBy("created_at","desc")
        ->get();

        return response()->json($notifications);
    }

    public function store(Request $request)
    {
    
    }

    public function update($id)
    {
        Notification::where('is_read', '0')
        ->where('user_id', $id)
        ->update([
            'is_read' => "1"
        ]);
        return response()->json([
            "status" => true,
            "message" => "Marked as read successfully"
        ],200);
    }

    public function destroy($id)
    {

    }
}
