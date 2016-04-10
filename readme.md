`npm install`

`composer install`

`cp .env.example .env`

in your `.env` file

```bash
DB_CONNECTION=sqlite
#DB_HOST=127.0.0.1
#DB_DATABASE=homestead
#DB_USERNAME=homestead
#DB_PASSWORD=secret
```

`touch database/database.sqlite`

`php artisan key:generate`

`php artisan migrate`

`php artisan serve` in one terminal session

navigate to `localhost:3000/register` and create a new user

`php artisan db:seed`

`npm run-script develop` in another terminal session