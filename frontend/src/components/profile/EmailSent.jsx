import { CheckCircleIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EmailSent = () => {
    const {email}=useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4 md:p-6">
    <div className="max-w-md w-full bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-green-500 text-white rounded-full p-3">
          <CheckCircleIcon className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold">Email Confirmed</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We've sent a confirmation email to
          <span className="font-medium">{email}</span>
        </p>
        <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/"
              >
                Continue to Website
              </Link>
      </div>
      <div className="border-t pt-6 space-y-4">
        <h2 className="text-lg font-medium">What's Next?</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Once you've confirmed your email, you'll be able to access all the features of our platform. Keep an eye out
          for your confirmation email, which will provide more information on how to get started.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          If you have any questions or need assistance, please don't hesitate to reach out to our support team.
        </p>
      </div>
    </div>
  </div>
  );
};

export default EmailSent;
