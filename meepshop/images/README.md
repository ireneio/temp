# @meepshop/images

This package will transform the image string to the `image proxy url`. Only need to add the images to [images](./images). You can see the details in [babel.js](./babel.js).

## How to use

```sh
import { useContext } from 'react';
import ImagesContext, { pathToImage } from '@meepshop/images';

const getUrl = useContext(ImagesContext);

<img src={getUrl(pathToImage)} />
```

## Environment

- IMGPROXY_KEY
- IMGPROXY_SALT
