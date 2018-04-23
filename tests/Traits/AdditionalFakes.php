<?php

namespace Tests\Traits;

trait AdditionalFakes
{
    protected function minTextLength(int $len)
    {
        $text = $this->faker()->text;

        while (strlen($text) < $len) {
            $text .= $text;
        }

        return $text;
    }
}
