import getImage, {
  previewProductGalleryOneProduct1_scaledSrc as previewProductGalleryOneProduct1,
  previewProductGalleryOneProduct2_scaledSrc as previewProductGalleryOneProduct2,
  previewProductGalleryOneProduct3_scaledSrc as previewProductGalleryOneProduct3,
  previewProductGalleryOneProduct4_scaledSrc as previewProductGalleryOneProduct4,
  previewProductGalleryTwoProduct5_scaledSrc as previewProductGalleryTwoProduct5,
  previewProductGalleryTwoProduct6_scaledSrc as previewProductGalleryTwoProduct6,
  previewProductGalleryTwoProduct7_scaledSrc as previewProductGalleryTwoProduct7,
} from '@meepshop/images';

const getScaledSrc = images =>
  Object.keys(images).reduce(
    (result, key) => ({
      ...result,
      [key]: getImage(images[key]),
    }),
    {},
  );

export default {
  id: 'preview',
  title: {
    zh_TW: '舒適磨毛針織上衣',
    en_US: '',
  },
  description: {
    zh_TW: '',
    en_US: '',
  },
  info: {
    zh_TW: '',
    en_US: '',
  },
  variantInfo: {
    sku: null,
    listPrice: null,
    retailPrice: null,
    suggestedPrice: null,
    stock: 0,
    cost: 550,
    vendorSku: null,
    maxPurchaseLimit: 99,
    minPurchaseItems: 1,
    weight: null,
    size: null,
    warehouseNumber: null,
    minRetailPrice: 1080,
  },
  coverImage: {
    fileId: 'c34eb2cf-33b2-472b-b84b-4bda5956bdfe',
    scaledSrc: getScaledSrc(previewProductGalleryOneProduct1),
  },
  galleries: [
    {
      images: [
        {
          fileId: 'c34eb2cf-33b2-472b-b84b-4bda5956bdfe',
          isMain: true,
          scaledSrc: getScaledSrc(previewProductGalleryOneProduct1),
        },
        {
          fileId: '4ca6a3e4-6b08-4107-b178-08b96cd26ac0',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryOneProduct2),
        },
        {
          fileId: 'b0b6509d-9117-4a28-a3d1-738c31e0b375',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryOneProduct3),
        },
        {
          fileId: 'f3121800-2b4c-421b-9403-6a64362922b3',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryOneProduct4),
        },
      ],
    },
    {
      images: [
        {
          fileId: 'ea8199ca-3f1b-4853-8869-d0716812d62c',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryTwoProduct5),
        },
        {
          fileId: '8bf70918-cff6-4b34-a06f-48231470c3f2',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryTwoProduct6),
        },
        {
          fileId: '0fec546c-5290-448c-bfc6-d622e19415b1',
          isMain: false,
          scaledSrc: getScaledSrc(previewProductGalleryTwoProduct7),
        },
      ],
    },
  ],
  tags: null,
  variants: [
    {
      id: '17c9b80f-b9f6-4543-bfaa-d444bb36c2c5',
      sku: null,
      listPrice: 0,
      retailPrice: 1080,
      suggestedPrice: null,
      discountPrice: null,
      totalPrice: 1080,
      specs: [
        {
          id: 'adfc106e-da9e-42ab-aeac-938ec1b8bae4',
          specId: 'eef8409c-414e-4af1-a824-f418f79f4f02',
          title: {
            zh_TW: 'F',
            en_US: '',
          },
        },
        {
          id: '800658dc-f80f-4ac8-a498-dc6e304b1604',
          specId: '8d5da46f-3abb-4bea-826a-d9d73f1ddaf2',
          title: {
            zh_TW: '米白',
            en_US: '',
          },
        },
      ],
      stock: 10,
      cost: 550,
      vendorSku: null,
      maxPurchaseLimit: 99,
      minPurchaseItems: 1,
      warehouseNumber: null,
      status: 1,
    },
    {
      id: '40a9786f-c64b-4752-b5ff-09ebcfa49814',
      sku: null,
      listPrice: 0,
      retailPrice: 1080,
      suggestedPrice: null,
      discountPrice: null,
      totalPrice: 1080,
      specs: [
        {
          id: '65ba16e3-3b7d-4854-8d94-e76ca119088c',
          specId: 'eef8409c-414e-4af1-a824-f418f79f4f02',
          title: {
            zh_TW: 'F',
            en_US: '',
          },
        },
        {
          id: 'cc87d348-d212-468b-8eee-3f7c84f71aa9',
          specId: '8d5da46f-3abb-4bea-826a-d9d73f1ddaf2',
          title: {
            zh_TW: '黑色',
            en_US: '',
          },
        },
      ],
      stock: 10,
      cost: 550,
      vendorSku: null,
      maxPurchaseLimit: 99,
      minPurchaseItems: 1,
      warehouseNumber: null,
      status: 1,
    },
    {
      id: '982f4f12-c96a-4bc6-9a1e-d23b2ba703be',
      sku: null,
      listPrice: 0,
      retailPrice: 1080,
      suggestedPrice: null,
      discountPrice: null,
      totalPrice: 1080,
      specs: [
        {
          id: '918ea885-33dc-4e41-9993-a58cfde4cbee',
          specId: 'eef8409c-414e-4af1-a824-f418f79f4f02',
          title: {
            zh_TW: 'XL',
            en_US: '',
          },
        },
        {
          id: '13989f87-c412-4ddb-98a3-bdcb614ab363',
          specId: '8d5da46f-3abb-4bea-826a-d9d73f1ddaf2',
          title: {
            zh_TW: '米白',
            en_US: '',
          },
        },
      ],
      stock: 10,
      cost: 550,
      vendorSku: null,
      maxPurchaseLimit: 99,
      minPurchaseItems: 1,
      warehouseNumber: null,
      status: 1,
    },
    {
      id: 'ec34736b-8045-4434-8bf9-0f38424f88eb',
      sku: null,
      listPrice: 0,
      retailPrice: 1080,
      suggestedPrice: null,
      discountPrice: null,
      totalPrice: 1080,
      specs: [
        {
          id: '1ca2cb5b-426c-41c1-aa40-0f007942834a',
          specId: 'eef8409c-414e-4af1-a824-f418f79f4f02',
          title: {
            zh_TW: 'XL',
            en_US: '',
          },
        },
        {
          id: '0ada5b3f-bbc3-4463-a64c-1cafebf381dc',
          specId: '8d5da46f-3abb-4bea-826a-d9d73f1ddaf2',
          title: {
            zh_TW: '黑色',
            en_US: '',
          },
        },
      ],
      stock: 10,
      cost: 550,
      vendorSku: null,
      maxPurchaseLimit: 99,
      minPurchaseItems: 1,
      warehouseNumber: null,
      status: 1,
    },
  ],
  supplier: null,
  purchasable: null,
  purchasableTime: null,
  specs: [
    {
      id: 'eef8409c-414e-4af1-a824-f418f79f4f02',
      title: {
        zh_TW: '尺寸',
        en_US: '',
      },
    },
    {
      id: '8d5da46f-3abb-4bea-826a-d9d73f1ddaf2',
      title: {
        zh_TW: '顏色',
        en_US: '',
      },
    },
  ],
  status: 1,
  showUserPrice: null,
};
