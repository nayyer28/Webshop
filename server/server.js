const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
const stripe = require("stripe")("sk_test_51NJHaZHSMIQrzvMhXjzGgp0C5ydyD0DhPhiqUBeCmNCplkE8Xd8IagbYOoMluxy0UCMyUbpHPPe8tjorI5xpuJKj00Gn6lt56H");

app._router.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            //could also add shipping info following: https://stripe.com/docs/payments/checkout/shipping
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100, 
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html"
        })
        res.status(200).json(session);
    
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log(' payment server is running on port 4242'));