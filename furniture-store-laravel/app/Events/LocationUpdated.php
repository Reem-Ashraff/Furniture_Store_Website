<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Driver_location;

class LocationUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $location;
    /**
     * Create a new event instance.
     */
    public function __construct( Driver_location $location )
    {
        $this->location = $location;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastAs()
    {
        return 'LocationUpdated';
    }

    public function broadcastOn()
    {
        return new Channel('delivery.'.$this->location->delivery_id);
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->location->id,
            'delivery_id' => $this->location->delivery_id,
            'latitude' => (float) $this->location->latitude,
            'longitude' => (float) $this->location->longitude,
            'created_at' => $this->location->created_at->toDateTimeString(),
        ];
    }
}
