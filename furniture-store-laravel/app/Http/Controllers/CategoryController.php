<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function search($query)
    {
        $categories = Category::select("*")
        ->where('category_name', 'LIKE', "%$query%")
        ->get();
        return response()->json($categories);
    }

    public function limit()
    {
        $limitedCategories = Category::limit(10)->get();
        return response()->json($limitedCategories);
    }

    public function show($id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    public function store(Request $request)
    {
        Category::create([
            "category_name" => $request->category_name,
            "parent_id" => $request->parent_id
        ]);

        return response()->json([
            "status"=>true,
            "message"=>"Category added successfully"
        ],200);
    }

    public function edit(Request $request)
    {
        $category = Category::find($request->id);

        if(trim($category->category_name) !== trim($request->category_name) && $category->parent_id != $request->parent_id){
            Category::where('id', $request->id)->update([
                "category_name" => $request->category_name,
                "parent_id" => $request->parent_id
            ]);
        }
        else if(trim($category->category_name) !== trim($request->category_name)){
            Category::where('id', $request->id)->update([
                "category_name" => $request->category_name
            ]);
        }
        else if($category->parent_id != $request->parent_id){
            Category::where('id', $request->id)->update([
                "parent_id" => $request->parent_id
            ]);
        }

        return response()->json([
            "status"=>true,
            "message"=>"Category edited successfully"
        ],200);
    }

    public function destroy($id)
    {
        Category::find($id)->delete();
        return response()->json([
            "status"=>true,
            "message"=>"Category deleted successfully"
        ],200);
    }
}
