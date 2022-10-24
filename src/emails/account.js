const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendProductOrderEmail = (email, product) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAL,
        subject: 'New Product Order Notification!',
        text: `Please be informed that we received a new order for the following product. \n
        Product Name:${product.name} \n
        Product Price:${parseFloat(product.price)} \n
        Product Shipping Fee:${parseFloat(product.shipping)} \n
        Product Description: ${product.description} \n

        Thank you. \n
        Regards
        
        `,
    });
};

module.exports = {
    sendProductOrderEmail,
};
