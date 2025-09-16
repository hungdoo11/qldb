<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | Cấu hình này cho phép các request từ domain khác (React, Vue, Mobile app...)
    | chỉnh lại domain cụ thể thay vì "*" nếu bạn muốn bảo mật hơn.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3001'], // hoặc '*' nếu muốn cho tất cả

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
