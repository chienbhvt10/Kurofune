<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait RespondsStatusTrait
{
    protected function response_data($message = null, $data = null, $error = false, $error_message = null, $error_data = null, $status = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        $error_code = $error ? "ERROR" : "NO_ERROR";
        if($error && !$error_message) {
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

    protected function response_exception(): \Illuminate\Http\JsonResponse
    {
        return $this->response_data(null, null, true, null, null, 500);
    }

    protected function response_message_data_success($message = null, $data = null): \Illuminate\Http\JsonResponse
    {
        return $this->response_data($message, $data, false, null, null, 200);
    }

    protected function response_message_success($message): \Illuminate\Http\JsonResponse
    {
        return $this->response_data($message, null, false, null, null, 200);
    }

    protected function response_data_success($data): \Illuminate\Http\JsonResponse
    {
        return $this->response_data(null, $data, false, null, null, 200);
    }

    protected function response_error($error_message = null, $status_code = 500): \Illuminate\Http\JsonResponse
    {
        return $this->response_data(null, null, true, $error_message, null, $status_code);
    }

    protected function response_validate($error_data): \Illuminate\Http\JsonResponse
    {
        return $this->response_data(null, null, true, null, $error_data, 422);
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
            'status_code' => 200,
            'message' => '',
            'error_code' => 'ERROR',
            'error_message' => '',
            'error_data' => [
                'slug' => [__('message.slug.unique')]
            ],
            'data' => '',
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
