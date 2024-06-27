'use client'

import { useFormState } from 'react-dom';
import { CreateSubscription } from '@/lib/email/actions';
const initialState = {
  message: '',
  success: false,
};

export default function SubscriptionForm() {
  const [state, formAction] = useFormState(CreateSubscription, initialState);

  return (
    <form action={formAction} className="max-w-md mx-auto mt-8 space-y-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
        First Name:
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Subscribe
    </button>
    {state.message && (
      <p className={`mt-2 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
        {state.message}
      </p>
    )}
  </form>
  );
}