<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product_sale;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class Product_saleController extends Controller
{
    public function index()
    {
        $products = Category::join("products","products.category_id","=","categories.id")
        ->join("product_sales","product_sales.product_id","=","products.id")
        ->join("sales","product_sales.sale_id","=","sales.id")
        ->select("products.*","categories.category_name","sales.*","product_sales.*")
        ->get();

        return response()->json($products);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
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
