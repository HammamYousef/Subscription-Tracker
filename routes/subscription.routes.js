import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  // Handle fetching all subscriptions logic here
  res.status(200).json({ message: "All subscriptions fetched successfully" });
});

subscriptionRouter.get('/:id', (req, res) => {
  // Handle fetching a specific subscription by ID logic here
  const subscriptionId = req.params.id;
  res.status(200).json({ message: `Subscription with ID ${subscriptionId} fetched successfully` });
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  // Handle updating a subscription logic here
  const subscriptionId = req.params.id;
  res.status(200).json({ message: `Subscription with ID ${subscriptionId} updated successfully` });
});

subscriptionRouter.delete('/:id', (req, res) => {
  // Handle deleting a subscription logic here
  const subscriptionId = req.params.id;
  res.status(200).json({ message: `Subscription with ID ${subscriptionId} deleted successfully` });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  // Handle updating subscriptions for a specific user logic here
  const userId = req.params.id;
  res.status(200).json({ message: `Subscriptions for user with ID ${userId} cancelled successfully` });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  // Handle fetching upcoming renewals logic here
    res.status(200).json({ message: "Upcoming renewals fetched successfully" });
});

export default subscriptionRouter;