# @meepshop/next-store

This package is `store` server which use `next`.

| command | example    | note                    |
| ------- | ---------- | ----------------------- |
| clean   | yarn clean | Clean `.next` folder.   |
| dev     | yarn dev   | Run the `dev` server.   |
| prod    | yarn prod  | Build the `prod` files. |
| start   | yarn start | Run the `prod` server.  |

When you run the server, you can use those environment variable:

| env               | example                                                                   | note |
| ----------------- | ------------------------------------------------------------------------- | ---- |
| VERSION           | VERSION=1.0.0 yarn dev                                                    |      |
| API, EXTERNAL_API | API=https://api.meepshop.tw EXTERNAL_API=https://api.meepshop.tw yarn dev |      |
| STORE_DOMAIN      | STORE_DOMAIN=test.com yarn dev                                            |      |
| ANALYZE           | ANALYZE=true yarn dev                                                     |      |
| PORT              | PORT=8000 yarn dev                                                        |      |
