<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('tasks','TaskController');
Route::get('{id}/edit',function (){
  return redirect('/home');
});
