<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = "products";
    protected $fillable = [
        "product_name",
        "price",
        "description",
        "category_id",
        "stock",
        "image",
        "sales_count"
    ];

    public function category(){
        return $this -> belongsTo(Category::class);
    }

    public function favorite(){
        return $this -> hasMany(Favorite::class);
    }

    public function cart_item(){
        return $this -> hasMany(Cart_item::class);
    }

    public function product_sale(){
        return $this -> hasMany(Product_sale::class);
    }

    public function order_item(){
        return $this -> hasMany(Order_item::class);
    }

    public function sales()
    {
        return $this->belongsToMany(Sale::class, 'product_sales');
    }
}
