const Subscription = require("../models/Subscription");
const User = require("../models/User");

const registerUser = async (req, res) => {
    const { email, notification_interval, device_token, stocks } = req.body;
    if (!email || !notification_interval || !Array.isArray(stocks)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        // Create the user
        const user = new User({ email, notification_interval, device_token });
        
        // Save the user instance
        await user.save();  // Corrected: use user.save(), not User.save()

        // Add subscriptions
        const subscriptions = stocks.map(stock_symbol => ({
            user_id: user._id,
            stock_symbol,
        }));
        await Subscription.insertMany(subscriptions);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = { registerUser };
