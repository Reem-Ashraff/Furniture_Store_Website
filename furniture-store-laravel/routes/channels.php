<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Delivery;

 Broadcast::channel('delivery.{deliveryId}', function ($deliveryId) {
    return true; // مؤقتًا نسمح للجميع بالاستماع
});