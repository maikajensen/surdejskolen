export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export interface Workshop {
    id: string;
    title: string;
    date: string; // ISO date string YYYY-MM-DD
    time: string; // Time string HH:MM:SS
    end_time?: string; // Optional end time string HH:MM:SS
    price: number;
    total_slots: number;
    slots_taken: number;
    created_at: string;
}

export interface Booking {
    id: string;
    workshop_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    status: 'confirmed' | 'waitlist' | 'cancelled';
    created_at: string;
}

export interface Recipe {
    id: string;
    title: string;
    category: 'surdej' | 'overskydende' | 'grundopskrift';
    slug: string;
    description: string;
    content: string; // HTML/Rich Text
    image_url: string;
    published: boolean;
    created_at: string;
}

export interface ShopOrder {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_address: string;
    customer_city: string;
    customer_zip: string;
    phone?: string;
    total_amount: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    created_at: string;
}

export interface ShopOrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price_at_purchase: number;
}
