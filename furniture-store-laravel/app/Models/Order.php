<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $table = "orders";
    protected $fillable = [
        "user_id",
        "total_price",
        "status",
        "order_code"
    ];

    public function user(){
        return $this -> belongsTo(User::class);
    }

    public function order_item(){
        return $this -> hasMany(Order_item::class);
    }

    public function delivery(){
        return $this -> hasMany(Delivery::class);
    }

    protected static function boot()
{
    parent::boot();

    static::creating(function ($order) {
        $order->order_code = self::generateUniqueCode();
    });
}

protected static function generateUniqueCode($length = 10)
{
    do {
        $code = strtoupper(Str::random($length));
    } while (self::where('order_code', $code)->exists());

    return $code;
}

}
