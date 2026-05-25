<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/products",[App\Http\Controllers\ProductController::class,"index"]);
Route::get("/bestSellers",[App\Http\Controllers\ProductController::class,"bestSellers"]);
Route::get("/newArrivals",[App\Http\Controllers\ProductController::class,"newArrivals"]);
Route::post("/addProduct",[App\Http\Controllers\ProductController::class,"store"]);
Route::get("/product/{id}",[App\Http\Controllers\ProductController::class,"show"]);
Route::get("/details/{id}",[App\Http\Controllers\ProductController::class,"details"]);
Route::get("/productDelete/{id}",[App\Http\Controllers\ProductController::class,"destroy"]);
Route::get("/search/{query}",[App\Http\Controllers\ProductController::class,"search"]);
Route::post("/updateProduct",[App\Http\Controllers\ProductController::class,"update"]);
Route::get("/categories",[App\Http\Controllers\CategoryController::class,"index"]);
Route::post("/editCategory",[App\Http\Controllers\CategoryController::class,"edit"]);
Route::post("/addCategory",[App\Http\Controllers\CategoryController::class,"store"]);
Route::get("/getCategory/{id}",[App\Http\Controllers\CategoryController::class,"show"]);
Route::get("/searchCategories/{query}",[App\Http\Controllers\CategoryController::class,"search"]);
Route::get("/categoriesLimited",[App\Http\Controllers\CategoryController::class,"limit"]);
Route::get("/category/{id}",[App\Http\Controllers\CategoryController::class,"destroy"]);
Route::get("/users",[App\Http\Controllers\UserController::class,"index"]);
Route::post("/user",[App\Http\Controllers\UserController::class,"show"]);
Route::post("/add",[App\Http\Controllers\UserController::class,"addUser"]);
Route::post("/addUser",[App\Http\Controllers\UserController::class,"store"]);
Route::post("/editUser/{id}",[App\Http\Controllers\UserController::class,"update"]);
Route::get("/searchUser/{query}",[App\Http\Controllers\UserController::class,"search"]);
Route::get("/favorites/{id}",[App\Http\Controllers\FavoriteController::class,"show"]);
Route::delete("/favorite/{id}",[App\Http\Controllers\FavoriteController::class,"destroy"]);
Route::post("/addFavorite",[App\Http\Controllers\FavoriteController::class,"store"]);
Route::delete("/cartItem/{id}",[App\Http\Controllers\Cart_itemController::class,"destroy"]);
Route::get("/cartItems/{id}",[App\Http\Controllers\Cart_itemController::class,"show"]);
Route::post("/addToCart",[App\Http\Controllers\Cart_itemController::class,"store"]);
Route::get("/sales",[App\Http\Controllers\SaleController::class,"index"]);
Route::get("/activeSales",[App\Http\Controllers\SaleController::class,"activeSales"]);
Route::get("/activeSalesProducts",[App\Http\Controllers\SaleController::class,"ActiveSalesProducts"]);
Route::post("/sale",[App\Http\Controllers\SaleController::class,"store"]);
Route::get("/sale/{id}",[App\Http\Controllers\SaleController::class,"show"]);
Route::post("/updateSale/{id}",[App\Http\Controllers\SaleController::class,"update"]);
Route::get("/saleProducts",[App\Http\Controllers\SaleController::class,"saleProducts"]);
Route::delete("/saleDelete/{id}",[App\Http\Controllers\SaleController::class,"destroy"]);
Route::get("/productsSale",[App\Http\Controllers\Product_saleController::class,"index"]);
Route::get("/orders",[App\Http\Controllers\OrderController::class,"orders"]);
Route::get("/pendingOrders",[App\Http\Controllers\OrderController::class,"pendingOrders"]);
Route::get("/allOrders",[App\Http\Controllers\OrderController::class,"allOrders"]);
Route::get("/orders/{id}",[App\Http\Controllers\OrderController::class,"index"]);
Route::get("/orderDetails/{id}",[App\Http\Controllers\OrderController::class,"show"]);
Route::get("/order/{id}",[App\Http\Controllers\OrderController::class,"order"]);
Route::get("/orderUser/{id}",[App\Http\Controllers\OrderController::class,"orderUser"]);
Route::get("/orderItems/{id}",[App\Http\Controllers\OrderController::class,"details"]);
Route::post("/order",[App\Http\Controllers\OrderController::class,"store"]);
Route::post("/status",[App\Http\Controllers\OrderController::class,"changeStatus"]);
Route::get("/notifications/{id}",[App\Http\Controllers\NotificationController::class,"show"]);
Route::get("/readed/{id}",[App\Http\Controllers\NotificationController::class,"update"]);
Route::get('/driver/{id}/', [App\Http\Controllers\DeliveryController::class, 'driver']);
Route::post("/message",[App\Http\Controllers\MessageController::class,"store"]);
Route::get("/allMessages",[App\Http\Controllers\MessageController::class,"index"]);

Route::post('/addDelivery', [App\Http\Controllers\DeliveryController::class, 'store']);
Route::post('/delivery/{delivery}/update-location', [App\Http\Controllers\DeliveryController::class, 'update']);
Route::get('/delivery/{delivery}/latest-location', [App\Http\Controllers\DeliveryController::class, 'latestLocation']);