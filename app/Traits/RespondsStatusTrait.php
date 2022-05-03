<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait RespondsStatusTrait
{
    protected function success($message, $status = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status_code' => $status,
            'message' => $message,
        ], $status);
    }

    protected function successWithData($message, $data = [], $status = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status_code' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    protected function responseData($data = [], $status = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status_code' => $status,
            'data' => $data
        ], $status);
    }

    protected function errorResponse($message, $status = Response::HTTP_INTERNAL_SERVER_ERROR): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status_code' => $status,
            'message' => $message,
        ], $status);
    }
}
