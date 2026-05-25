<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show(Request $request)
    {
        $user = [];
        $user = DB::select("select * from users where email = ?", [$request->email]);
        if (empty($user)) {
            return response()->json([
                "status" => false,
                "message" => "Invalid email"
            ], 200);
        } else {
            if (Hash::check($request->password, $user[0]->password)) {
                return response()->json([
                    "status" => true,
                    "message" => "loged in successfully",
                    "user_data" => $user[0]
                ], 200);
            } else {
                return response()->json([
                    "status" => false,
                    "message" => "Invalid password"
                ]);
            }
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            "email" => "required",
            "password" => "required"
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => bcrypt($request->password),
        ]);

        // $request["password"] = Hash::make($request["password"]);
        // $user = User::create($request->all());

        $newuser = [];
        $newuser = DB::select("select * from users order by created_at desc");

        return response()->json([
            "status" => true,
            "message" => "User added successfully",
            "user_data" => $newuser[0]
        ], 200);
    }

    public function addUser(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            "email" => "required",
            "password" => "required"
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
            'password' => bcrypt($request->password),
        ]);

        // $request["password"] = Hash::make($request["password"]);
        // $user = User::create($request->all());

        $newuser = [];
        $newuser = DB::select("select * from users order by created_at desc");

        return response()->json([
            "status" => true,
            "message" => "User added successfully",
            "user_data" => $newuser[0]
        ], 200);
    }

    public function search($query)
    {
        // $users = User::select("*")
        // ->where('username', 'LIKE', "%$query%")
        // ->get();
        // return response()->json($users);
        $users = User::where(function ($q) use ($query) {
            $q->where('username', 'LIKE', "%{$query}%")
                ->orWhere('email', 'LIKE', "%{$query}%")
                ->orWhere('address', 'LIKE', "%{$query}%")
                ->orWhere('role', 'LIKE', "%{$query}%");
        })
            ->get();
        return response()->json($users);
    }

    public function update($id, Request $request)
    {
        $user = User::where("id", $id)
            ->update([
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address
            ]);

        $newuser = [];
        $newuser = User::find($id);

        return response()->json([
            "status" => true,
            "message" => "User data updated successfully",
            "user_data" => $newuser[0]
        ], 200);
    }

    public function destroy($id) {}
}
