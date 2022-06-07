<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait RespondsStatusTrait
{
    protected function response_data($message = null, $data = null, $error = false, $error_message = null, $error_data = null, $status = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        $error_code = $error ? "ERROR" : "NO_ERROR";
        if($error && empty($error_message)) {
            $error_message = __('An error has occurred.');
        }
        return response()->json([
            'status_code' => 200,
            'message' => $message,
            'error_code' => $error_code,
            'error_message' => $error_message,
            'error_data' => $error_data,
            'data' => $data,
        ], $status);
    }

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

    protected function errorUniqueSlug(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status_code' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'message' => [
                'slug' => [__('message.slug.unique')]
            ],
        ]);
    }
}
