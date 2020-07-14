<?php

namespace Oza75\LaravelHubble\Tests;


class ExampleTest extends TestCase
{

    /** @test */
    public function true_is_true()
    {
        $this->assertTrue(true);
    }

    public function test_it_works()
    {
        $user = $this->createUser();
        $this->withoutExceptionHandling();
        $this->actingAs($user)->get(route('hubble.home'));
    }
}
