<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $table = "deliveries";
    protected $fillable = ["order_id","driver_id","vehicle_number"];

    public function order(){
        return $this -> belongsTo(Order::class);
    }

    public function user(){
        return $this -> belongsTo(Users::class);
    }

    public function driver_location(){
        return $this -> hasMany(Driver_location::class);
    }
}
