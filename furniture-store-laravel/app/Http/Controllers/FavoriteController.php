<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function index()
    {
    
    }

    public function show($id)
    {
        $favorites = Product::join("favorites","favorites.product_id","=","products.id")
        ->join("users","favorites.user_id","=","users.id")
        ->select("products.*","favorites.id as favorite_id","favorites.product_id")
        ->where("favorites.user_id",$id)
        ->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $favorite = Favorite::create($request->all());
        return response() -> json([
            "status" => true,
            "message" => "Product added to favorites successfully"
        ],200);
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
        Favorite::find($id)->delete();
        return response()->json([
            "status"=>true,
            "message"=>"Product deleted successfully from favorites"
        ],200);
    }
}
