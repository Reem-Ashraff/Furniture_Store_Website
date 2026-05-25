<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')->get();
        return response()->json($products);
    }

    public function bestSellers()
    {
        $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')
            ->orderByDesc('sales_count')
            ->orderByDesc('created_at')->get();
        return response()->json($products);
    }

    public function newArrivals()
    {
        $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')
            ->orderByDesc('created_at')->get();
        return response()->json($products);
    }

    public function show($id)
    {
        $categoryIds = Category::where('id', $id)
            ->orWhere('parent_id', $id)
            ->pluck('id');

        $products = Product::leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')
            ->whereIn('products.category_id', $categoryIds)
            ->get();
        // $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
        // ->select('products.*', 'categories.category_name')
        // ->where('products.category_id', $id)
        // ->get();
        return response()->json($products);
    }

    public function details($id)
    {
        $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')
            ->where('products.id', $id)
            ->get();
        return response()->json($products);
    }

    public function search($query)
    {
        $products = Product::leftjoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category_name')
            ->where('product_name', 'LIKE', "%$query%")
            ->orWhere('category_name', 'LIKE', "%$query%")
            ->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $data = $request->only(["product_name", "price", "description", "category_id", "stock"]);
        $imagePath = null;
        if ($request->hasFile("image")) {
            $imagePath = $request->file("image")->store("products", "public");
            $data["image"] = $imagePath;
            $product = Product::create($data);
            return response()->json([
                "status" => true,
                "message" => "Product added successfully.",
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Product not added.",
            ], 200);
        }
    }

    public function update(Request $request)
    {
        $data = $request->only(["id", "product_name", "price", "description", "category_id", "stock"]);
        $imagePath = null;
        if ($request->hasFile("image")) {
            $imagePath = $request->file("image")->store("products", "public");
            $data["image"] = $imagePath;
            Product::where("id", $data["id"])->update([
                "product_name" => $data["product_name"],
                "price" => $data["price"],
                "description" => $data["description"],
                "category_id" => $data["category_id"],
                "stock" => $data["stock"],
                "image" => $data["image"],
            ]);
            return response()->json([
                "status" => true,
                "message" => "Product updated successfully.",
            ], 200);
        } else {
            Product::where("id", $data["id"])->update([
                "product_name" => $data["product_name"],
                "price" => $data["price"],
                "description" => $data["description"],
                "category_id" => $data["category_id"],
                "stock" => $data["stock"]
            ]);
            return response()->json([
                "status" => true,
                "message" => "Product updated successfully.",
            ], 200);
        }
    }

    public function destroy($id)
    {
        Product::find($id)->delete();
        return response()->json([
            "status" => true,
            "message" => "Product deleted successfully"
        ], 200);
    }
}
