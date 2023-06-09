// Interfaccia di Product
export interface Product {
    id: number
    model: string;
    number_code: string;
    itemsInStock: number;
    price: number;
    selectedSize?: Sizes;
    img_url: string;
    sizes: Sizes[];
}

export interface Sizes {
    size: string,
    qty: number
}

export interface ProductSizePayload {
    size: Sizes;
    product: Product;
}

export interface PurchaseProductPayload {
    productId: number;
    size: string;
}

// Array di prodotti
const initialState: Array<Product> = [
    {
        id: 1,
        model: 'Ray-Ban Wayfarer',
        number_code: 'RB3210 2112A',
        itemsInStock: 5,
        price: 120.60, 
        img_url: 'https://immagini.trovaprezzi.it/varianti/ray_ban_wayfarer_classic_original.jpg',
        sizes: [{size: '50mm', qty: 3}, {size: '52mm', qty: 2}]
    },
    {
        id: 2,
        model: 'Ray-Ban Round',
        number_code: 'RB9210 1149',
        itemsInStock: 4,
        price: 166.00, 
        img_url: 'https://www.amevista.com/it/image/foto//luxottica/0RJ9547S%20201-8G.jpg',
        sizes: [{size: '50mm', qty: 1}, {size: '52mm', qty: 1}, {size: '53mm', qty: 2}]
    },
    {
        id: 3,
        model: 'Ray-Ban Clubmaster',
        number_code: 'RB3594 9093CB 53',
        itemsInStock: 3,
        price: 152.00, 
        img_url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51kv7vFoWRL._AC_UL1500_.jpg',
        sizes: [{size: '50mm', qty: 2}, {size: '52mm', qty: 2}],
    },
    {
        id: 4,
        model: 'Ray-Ban RB3594',
        number_code: 'RB3594 2345 53',
        itemsInStock: 4,
        price: 259.90, 
        img_url: 'https://www.lentiamo.cz/img/ray-ban-rb3594-9115s0-53/4386-800.webp',
        sizes: [{size: '50mm', qty: 4}],
    },
    {
        id: 5,
        model: 'Ray-Ban Aviator',
        number_code: 'RB6211 5122A 50',
        itemsInStock: 3,
        price: 150.90,
        img_url: 'https://www.amevista.com/it/image/foto//luxottica/0RJ9506S%20220-11.jpg',
        sizes: [{size: '50mm', qty: 2}, {size: '52mm', qty: 1}]
    },
];

export default initialState;