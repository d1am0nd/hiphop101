<?php

namespace Tests\Traits;

use Illuminate\Foundation\Testing\TestResponse;

trait AdditionalAsserts
{
    protected function assertDataCount(int $expected, TestResponse $res, string $message = '')
    {
        $this->assertCount($expected, $res->getData()->data, $message);
    }
}
