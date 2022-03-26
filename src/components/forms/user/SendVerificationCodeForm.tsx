export default ({ onSubmit, handleBack }: { onSubmit: () => void; handleBack?: () => void }) => {
    return (
        <div className="flex w-full justify-center flex-col gap-y-4">
            <button
                className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                type="button"
                onClick={onSubmit}
            >
                Resend Verfication Code
            </button>
            {handleBack && (
                <button
                    className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                    type="button"
                    onClick={handleBack}
                >
                    Back
                </button>
            )}
        </div>
    )
}
