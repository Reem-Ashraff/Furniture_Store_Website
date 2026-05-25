<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::select("*")
        ->orderBy("created_at","desc")
        ->get();

        return response()->json($messages);
    }

    public function show($id)
    {
    }

    public function search($query)
    {
    }

    public function store(Request $request)
    {
        $message = Message::create([
            "email" => $request->email,
            "message" => $request->message
        ]);

        return response()->json([
            "status" => true,
            "message" => "Message sent successfully."
        ], 200);
    }

    public function update(Request $request)
    {
    }

    public function destroy($id)
    {
    }
}
