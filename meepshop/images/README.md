# @meepshop/images

This package will transform the image string to the `image proxy url`. Only need to add the images to [images](./images). You can see the details in [babel.js](./babel.js).

## How to use

```sh
import { useContext } from 'react';
import { pathToImage } from '@meepshop/images';

<img src={pathToImage} />
```

## Environment

- IMGPROXY_KEY_STAGE
- IMGPROXY_SALT_STAGE
- IMGPROXY_KEY_PRODUCTION
- IMGPROXY_SALT_PRODUCTION
