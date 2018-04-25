<?php

namespace Tests\Feature\Api\Popular;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ArticlesTest extends TestCase
{

    use DatabaseTransactions, Traits\WithSetup;
}
