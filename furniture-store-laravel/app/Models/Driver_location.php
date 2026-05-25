<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver_location extends Model
{
    use HasFactory; 

    protected $table = "driver_locations";
    protected $fillable = ["delivery_id","latitude","longitude"];

    public function delivery(){
        return $this -> belongsTo(Delivery::class);
    }
}
