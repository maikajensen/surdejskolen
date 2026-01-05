import emailjs from '@emailjs/browser';
import { ShopOrder, ShopOrderItem } from '@/types';

export const sendOrderConfirmation = async (
    order: ShopOrder,
    items: Omit<ShopOrderItem, 'id'>[]
) => {
    // Reuse existing Service ID, Template ID, and Public Key from BookingForm
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS environment variables are missing.');
        return;
    }

    // Format items for the email
    const itemsList = items
        .map(
            (item) =>
                `${item.quantity}x ${item.product_name} (${item.price_at_purchase} kr)`
        )
        .join(', ');

    const templateParams: Record<string, unknown> = {
        name: order.customer_name,
        email: order.customer_email,
        title: itemsList,
        order_id: order.id,
        order_total: `${order.total_amount} kr`,
        admin_email: 'maikalindkvistjensen@gmail.com'
    };

    try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Order confirmation email sent!');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

