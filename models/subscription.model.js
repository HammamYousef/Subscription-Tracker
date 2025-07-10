import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["entertainment", "utilities", "food", "health", "other"],
        default: "other",
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer"],
        default: "credit_card",
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: (value) => value <= Date.now(),
            message: "Start date cannot be in the future",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    }
}, { timestamps: true } );

subscriptionSchema.pre('save', function(next){
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < this.startDate) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;