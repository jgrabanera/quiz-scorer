<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $message = $request->input('message');
        Http::post('http://192.168.0.101:3001/broadcast', [
            'message' => $message,
        ]);

        return response()->json(['status' => 'Message sent']);
    }
}
