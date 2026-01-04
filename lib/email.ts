import { ShopOrder, ShopOrderItem } from '@/types';

export const sendOrderConfirmation = async (
    order: ShopOrder,
    items: Omit<ShopOrderItem, 'id'>[]
) => {
    try {
        await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'shop_order',
                data: {
                    customer_email: order.customer_email,
                    customer_name: order.customer_name,
                    order_id: order.id,
                    total_amount: order.total_amount, // or calculate from items if needed
                    items: items, // Pass items array directly
                }
            })
        });

        console.log('Order confirmation email request sent!');
    } catch (error) {
        console.error('Failed to send email:', error);
        // We don't throw here to avoid blocking the UI success state
    }
};

