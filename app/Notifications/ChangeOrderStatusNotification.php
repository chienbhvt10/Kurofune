<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class ChangeOrderStatusNotification extends Notification
{
    use Queueable;

    public $order;
    public $status;
    public $user;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Order $order, $status, $user)
    {
        $this->order = $order;
        $this->status = $status;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)->view('emails.change_order_status', ['order' => $this->order, 'user' => $this->user, 'status' => $this->status])
            ->subject(__(':user has changed order status', ['user' => $this->user->name]));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
