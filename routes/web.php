<?php


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::resource('/cliente', 'ClienteController@index')->middleware('auth');

Route::get('/home', 'HomeController@index')->name('home');
