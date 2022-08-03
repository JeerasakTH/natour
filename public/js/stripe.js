import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51LQs4cH9KEV87JZWZbdwEzjrUOOCbci7pcmz3sD5ybwOXLvA7HsKrCnz2R9Pm87zSuIG08ICyKAS437RIf12hVyu00LxGSqz7K'
  );
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
