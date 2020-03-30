# @meepshop/images

## How to use

```sh
import { useContext } from 'react';
import ImagesContext, { pathToImage } from '@meepshop/images';

const getUrl = useContext(ImagesContext);

<img src={getUrl(pathToImage)} />
```
