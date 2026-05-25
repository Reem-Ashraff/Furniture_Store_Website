<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_sale extends Model
{
    use HasFactory;

    protected $table = "product_sales";
    protected $fillable = [
        "product_id",
        "sale_id",
    ];

    // public function sale(){
    //     return $this -> belongsTo(Sale::class);
    // }

    // public function product(){
    //     return $this -> belongsTo(Product::class);
    // }
}
