import emailjs from '@emailjs/browser';
import { ShopOrder, ShopOrderItem } from '@/types';

// Initialize EmailJS with your public key if needed, or rely on environment variables
// Note: EmailJS.init is often done in a layout or root component, but for simple use cases
// we can pass the public key in the send function options or rely on default init if added similarly.
// Here we will use the credentials directly in the send call (or ensure they are set).

interface EmailParams {
    to_name: string;
    to_email: string;
    order_id: string;
    order_total: string;
    order_items: string; // Formatted string of items
    my_email: string; // For the blind copy or separate notification if template supports it
}

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
        .join(', '); // Comma separated looks better in a "title" field than newlines

    const templateParams: Record<string, unknown> = {
        // Map data to match the existing template variables:
        // {{name}} -> Customer Name
        // {{email}} -> Customer Email
        // {{title}} -> List of ordered items (as requested)
        name: order.customer_name,
        email: order.customer_email,
        title: itemsList,

        // Additional data (might not be shown if template doesn't use them, but good to send)
        order_id: order.id,
        order_total: `${order.total_amount} kr`,
    };

    try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Order confirmation email sent!');
    } catch (error) {
        console.error('Failed to send email:', error);
        // We don't throw here to avoid blocking the UI success state if email fails
    }
};
