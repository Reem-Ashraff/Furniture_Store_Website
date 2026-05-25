<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Order_item;
use App\Models\Product_sale;
use App\Models\User;
use App\Models\Product;
use App\Models\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index($id)
    {
        $orders = Order::where("user_id",$id)
        ->select("*")
        ->orderBy("created_at","desc")
        ->get();

        return response()->json($orders);
    }

    public function orders()
    {
        $orders = Order::select("*")
        ->orderBy("created_at","desc")
        ->get();

        return response()->json($orders);
    }

    public function pendingOrders()
    {
        $orders = Order::select("*")
        ->where("status","pending")
        ->orderBy("created_at","desc")
        ->get();

        return response()->json($orders);
    }

    public function allOrders()
    {
        $orders = Product::join('order_items', 'order_items.product_id', '=', 'products.id')
        ->join('orders', 'order_items.order_id', '=', 'orders.id')
        ->join('users', 'users.id', '=', 'orders.user_id')
        ->select("orders.*","order_items.*","products.*","users.username","orders.created_at as date")
        ->orderBy("orders.created_at","desc")
        ->get();

        return response()->json($orders);
    }

    public function order($id)
    {
        $order = Order::where("id",$id)
        ->select("*")
        ->get();

        return response()->json($order);
    }

    public function orderUser($id)
    {
        $user = Order::join('users', 'users.id', '=', 'orders.user_id')
        ->select("users.*")
        ->where('orders.id', $id)
        ->get();

        return response()->json($user);
    }

    public function changeStatus(Request $request)
    {
        if($request->status == "pending"){
            Order::where('id', $request->id)->update([
                "status" => "shipped"
            ]);
            Notification::create([
                "user_id" => $request->userId,
                "title" => "Order Shipped",
                "message" => "Your order #" . $request->order_code . " has been shipped.",
            ]);
            return response()->json([
                "status" => true,
                "message" => "Ordered Status updated successfully."
            ],200);
        }
        else if($request->status == "shipped"){
            Order::where('id', $request->id)->update([
                "status" => "completed"
            ]);
            Notification::create([
                "user_id" => $request->userId,
                "title" => "Order Completed",
                "message" => "Your order #" . $request->order_code . " has been successfully delivered. Thank you for shopping with us!",
            ]);
            return response()->json([
                "status" => true,
                "message" => "Ordered Status updated successfully."
            ],200);
        }
    }

    public function store(Request $request)
    {
        $user = User::find($request->id);
        if(trim($user->address) !== trim($request->address)){
            User::where('id', $request->id)->update([
                'address' => $request->address
            ]);
        }
            
        Order::create([
            "user_id"=>$request->id,
            "total_price"=>$request->total_price
        ]);

        $order = Order::latest()->first();

        for( $i = 0 ; $i < count($request->items) ; $i++ ){ 
            $item = (object)$request->items[$i];
            $product = Product::find($item->product_id);
            $quantity = $request->quantity[$item->item_id] ?? 1;
            $product_sale = Product_sale::join("sales","product_sales.sale_id","=","sales.id")
            ->select("*")
            ->where("product_sales.product_id",$item->product_id)
            ->first();
            if(!$product_sale){
                Order_item::create([
                    "order_id" => $order->id,
                    "product_id" => $item->product_id,
                    "price" => $item->price,
                    "discounted_price" => $item->price,
                    "quantity" => $quantity,
                    "total" => $item->price * $quantity
                ]);
                Product::where('id', $item->product_id)->update([
                    "stock" => $product->stock - $quantity,
                    "sales_count" => $product->sales_count + $quantity
                ]);
            }
            else{
                $discountedPrice = $product_sale->discount_type == "percentage"
                ? $item->price * (100 - $product_sale->discount_value) / 100
                : $item->price - $product_sale->discount_value;
                Order_item::create([
                    "order_id" => $order->id,
                    "product_id" => $item->product_id,
                    "price" => $item->price,
                    "discounted_price" => $discountedPrice,
                    "quantity" => $quantity,
                    "total" => $discountedPrice * $quantity
                ]);
                Product::where('id', $item->product_id)->update([
                    "stock" => $product->stock - $quantity,
                    "sales_count" => $product->sales_count + $quantity
                ]);
            }
        }

        Notification::create([
            "user_id" => $request->id,
            "title" => "New Order",
            "message" => "Your order is successfully submitted.",
        ]);

        return response()->json([
            "status" => true,
            "message" => "You ordered successfully"
        ],200);
    }

    public function show($id)
    {
        $order = Order::find($id);
        return response()->json($order);
    }

    public function details($id)
    {
        $details = Order::join("order_items","orders.id","=","order_items.order_id")
        ->join("products","products.id","=","order_items.product_id")
        ->select("*","order_items.id as item_id")
        ->where("order_id",$id)
        ->get();
        
        return response()->json($details);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
