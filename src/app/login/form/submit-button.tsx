export default function SubmitButton() {
    return (
        <div>
            <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                type="submit"
            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                            fillRule="evenodd"
                        />
                    </svg>
                </span>
                Sign in
            </button>
        </div>
    );
}
