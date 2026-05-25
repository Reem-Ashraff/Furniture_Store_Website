<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart_item;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class Cart_itemController extends Controller
{
    public function index()
    {
    
    }

    public function show($id)
    {
        $items = Product::join("cart_items","cart_items.product_id","=","products.id")
        ->join("users","cart_items.user_id","=","users.id")
        ->select("products.*","cart_items.id as item_id","cart_items.product_id")
        ->where("cart_items.user_id",$id)
        ->get();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = Cart_item::create($request->all());
        return response()->json([
            "status" => true,
            "message" => "Product added to cart successfully"
        ],200);
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
        Cart_item::find($id)->delete();
        return response()->json([
            "status"=>true,
            "message"=>"Product deleted successfully from cart"
        ],200);
    }
}
