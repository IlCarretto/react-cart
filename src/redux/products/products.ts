// Interfaccia di Product
export interface Product {
    id: number
    model: string;
    number_code: string;
    itemsInStock: number;
    price: number;
    selectedSize?: string;
    img_url: string;
    size: Array<string>;
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
        size: ['50 (1pcs)', '52 (3pcs)']
    },
    {
        id: 2,
        model: 'Ray-Ban Round',
        number_code: 'RB9210 1149',
        itemsInStock: 4,
        price: 166.00, 
        img_url: 'https://www.amevista.com/it/image/foto//luxottica/0RJ9547S%20201-8G.jpg',
        size: ['50 (1pcs)', '52 (3pcs)', '53 (5 pcs)']
    },
    {
        id: 3,
        model: 'Ray-Ban Clubmaster',
        number_code: 'RB3594 9093CB 53',
        itemsInStock: 3,
        price: 152.00, 
        img_url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51kv7vFoWRL._AC_UL1500_.jpg',
        size: ['50 (1pcs)', '52 (3pcs)']
    },
    {
        id: 4,
        model: 'Ray-Ban RB3594',
        number_code: 'RB3594 2345 53',
        itemsInStock: 4,
        price: 259.90, 
        img_url: 'https://www.lentiamo.cz/img/ray-ban-rb3594-9115s0-53/4386-800.webp',
        size: ['50 (1pcs)', '52 (3pcs)']
    },
    {
        id: 5,
        model: 'Ray-Ban Aviator',
        number_code: 'RB6211 5122A 50',
        itemsInStock: 3,
        price: 150.90,
        img_url: 'https://www.amevista.com/it/image/foto//luxottica/0RJ9506S%20220-11.jpg',
        size: ['50 (1pcs)', '52 (3pcs)']
    },
];

export default initialState;