# @store/server

This package is `store` server which use `next`.

| command | example    | note                    |
| ------- | ---------- | ----------------------- |
| clean   | yarn clean | Clean `.next` folder.   |
| dev     | yarn dev   | Run the `dev` server.   |
| prod    | yarn prod  | Build the `prod` files. |
| start   | yarn start | Run the `prod` server.  |

When you run the server, you can use those environment variable:

| env                         | example                                                                             | note |
| --------------------------- | ----------------------------------------------------------------------------------- | ---- |
| STORE_DOMAIN                | STORE_DOMAIN=test.com yarn dev                                                      |      |
| API_HOST, EXTERNAL_API_HOST | API_HOST=https://api.meepshop.tw EXTERNAL_API_HOST=https://api.meepshop.tw yarn dev |      |
| ANALYZE                     | ANALYZE=true yarn dev                                                               |      |
| PORT                        | PORT=8000 yarn dev                                                                  |      |
| REPO_VERSION                | REPO_VERSION=1.0.0 yarn dev                                                         |      |
