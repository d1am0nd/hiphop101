<?php

namespace Tests\Traits;

use Illuminate\Foundation\Testing\TestResponse;

trait AdditionalAsserts
{
    protected function assertDataCount(int $expected, TestResponse $res, string $message = '')
    {
        $this->assertCount($expected, $res->getData()->data, $message);
    }

    protected function assertAscOrder(iterable $data, string $attribute, string $identifier = 'id')
    {
        $data = collect($data);
        $this->assertEquals(
            $data->pluck($identifier),
            $data->sortBy($attribute)->pluck($identifier)
        );
    }

    protected function assertDescOrder(iterable $data, string $attribute, string $identifier = 'id')
    {
        $data = collect($data);
        $this->assertEquals(
            $data->pluck($identifier),
            $data->sortByDesc($attribute)->pluck($identifier)
        );
    }
}
