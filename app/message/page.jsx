export default function page() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mx-auto max-w-sm mt-24">
      <h2 className="text-gray-200 font-bold text-xl text-center mb-6">
        Please Check your email!
      </h2>
      <h4 className="text-gray-400 mb-4 font-semibold text-lg text-center">
        Thank you for signing up, we have sent a link to your email for
        verification
      </h4>

      <p className="text-center text-gray-400 mb-4 font-semibold text-sm">
        from <span className="font-bold text-gray-200">noreply</span>
      </p>
    </div>
  );
}
