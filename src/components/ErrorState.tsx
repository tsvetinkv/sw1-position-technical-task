interface ErrorStateProps {
    message: string
}

export function ErrorState({ message }: ErrorStateProps) {
    return (
        <div
            role="alert"
            className="flex min-h-[60vh] items-center justify-center p-4"
        >
            <div className="flex max-w-md flex-col items-center gap-4 rounded-card border border-red-200 bg-red-100 p-8 text-center shadow-card dark:border-red-800 dark:bg-red-900">
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-10 w-10 text-red-900 dark:text-red-100"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                </svg>

                <div>
                    <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
                        Something went wrong
                    </h2>
                    <p className="mt-1 text-sm text-red-900/80 dark:text-red-100/80">
                        {message}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-1 rounded-full bg-red-900 px-4 py-2 text-sm font-medium text-red-100 transition-colors hover:bg-red-800 dark:bg-red-100 dark:text-red-900 dark:hover:bg-red-200"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}