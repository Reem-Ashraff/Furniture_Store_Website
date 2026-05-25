<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Sale;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{

    public function index()
    {
        $sales = Sale::all();
        return response()->json($sales);
    }

    public function activeSales()
    {
        $sales = Sale::where("start_date", "<=", now())
            ->where("end_date", ">=", now())->get();
        return response()->json($sales);
    }

    public function saleProducts()
    {
        $products = Sale::join('product_sales', 'product_sales.sale_id', '=', 'sales.id')
            ->join('products', 'products.id', '=', 'product_sales.product_id')
            ->select('product_sales.*')->get();
        return response()->json($products);
    }

    public function ActiveSalesProducts()
    {
        $products = Sale::join('product_sales', 'product_sales.sale_id', '=', 'sales.id')
            ->join('products', 'products.id', '=', 'product_sales.product_id')
            ->select('product_sales.*',"sales.*","products.*")
            ->where("sales.start_date", "<=", now())
            ->where("sales.end_date", ">=", now())->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $sale = Sale::create([
            "title" => $request->title,
            "discount_type" => $request->discount_type,
            "discount_value" => $request->discount_value,
            "start_date" => $request->start_date,
            "end_date" => $request->end_date
        ]);
        $sale->products()->attach($request->products);

        return response()->json([
            "status" => true,
            "message" => "Sale added successfully"
        ], 200);
    }

    public function show(string $id)
    {
        $sale = Sale::findOrFail($id);
        $products = Product::join('product_sales', 'product_sales.product_id', '=', 'products.id')
            ->select('product_sales.*', 'products.*')
            ->where("product_sales.sale_id", $id)
            ->get();
        return response()->json([
            "sale" => $sale,
            "products" => $products
        ], 200);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $sale = Sale::where("sales.id", $id)
            ->update([
                "title" => $request->title,
                "discount_type" => $request->discount_type,
                "discount_value" => $request->discount_value,
                "start_date" => $request->start_date,
                "end_date" => $request->end_date
            ]);
        $sale = Sale::find($id);
        $sale->products()->sync($request->products);
        return response()->json([
            "status" => true,
            "message" => "Sale updated successfully.",
        ], 200);
    }

    public function destroy(string $id)
    {
        Sale::find($id)->delete();
        return response()->json([
            "status" => true,
            "message" => "Sale deleted successfully"
        ], 200);
    }
}
