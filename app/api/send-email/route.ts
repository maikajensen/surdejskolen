import { NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'maikalindkvistjensen@gmail.com';
const FROM_EMAIL = 'Surdejskolen <noreply@surdejskolen.dk>'; // Must be verified domain in Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendResultEmail(to: string[], subject: string, html: string) {
    if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is missing');
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: to,
            subject: subject,
            html: html,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send email via Resend API');
    }

    return response.json();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (!RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing');
            return NextResponse.json(
                { error: 'Email configuration is missing (RESEND_API_KEY).' },
                { status: 500 }
            );
        }

        if (!data.customer_email) {
            return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
        }

        const { customer_name, customer_email, order_id, total_amount, items, workshop_date, workshop_time } = data;

        // 1. Send Customer Receipt
        let customerSubject = '';
        let customerHtml = '';

        if (type === 'booking') {
            customerSubject = 'Tak for din booking hos Surdejskolen';
            customerHtml = `
        <h1>Tak for din booking, ${customer_name}!</h1>
        <p>Vi glæder os til at se dig.</p>
        <p><strong>Dato:</strong> ${workshop_date}</p>
        <p><strong>Tid:</strong> ${workshop_time}</p>
        <p><strong>Pris:</strong> ${total_amount} kr.</p>
        <br/>
        <p>Venlig hilsen,<br/>Surdejskolen</p>
      `;
        } else if (type === 'shop_order') {
            customerSubject = 'Tak for din ordre #' + order_id.slice(0, 8);
            customerHtml = `
        <h1>Tak for din ordre, ${customer_name}!</h1>
        <p>Vi har modtaget din bestilling.</p>
        <h3>Ordreoversigt:</h3>
        <ul>
          ${items.map((item: any) => `<li>${item.quantity}x ${item.product_name} - ${item.price_at_purchase} kr.</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> ${total_amount} kr.</p>
        <br/>
        <p>Venlig hilsen,<br/>Surdejskolen</p>
      `;
        }

        // 1. Send Customer Receipt
        try {
            await sendResultEmail([customer_email], customerSubject, customerHtml);
        } catch (customerError) {
            console.error('Failed to send customer email:', customerError);
            return NextResponse.json({ error: 'Kunne ikke sende email til kunden' }, { status: 500 });
        }

        // 2. Send Admin Notification
        let adminSubject = `Ny ${type === 'booking' ? 'Booking' : 'Ordre'} modtaget`;
        let adminHtml = `
      <h2>Ny aktivitet på Surdejskolen</h2>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Kunde:</strong> ${customer_name} (${customer_email})</p>
      <p><strong>Dato:</strong> ${new Date().toLocaleString('da-DK')}</p>
      <hr/>
      ${customerHtml} 
    `;

        // Fire and forget admin email logic, but awaiting to ensure it tries
        try {
            await sendResultEmail([ADMIN_EMAIL], adminSubject, adminHtml);
        } catch (adminError) {
            console.error('Failed to send admin email:', adminError);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
