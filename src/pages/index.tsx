import Link from 'next/link'
import { Layout } from '../components/common/Layout'
import Button from '@material-tailwind/react/Button'
import { useAuth } from '../lib/context/useAuth'
import dbConnect from '../lib/dbConnect'
import SignInForm from '../components/forms/user/SignInForm'

const Index = () => {
    const auth = useAuth()
    return (
        <>
            <div className="mx-auto w-full">
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    <Link href="/signup">
                        <a>
                            <button
                                className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </a>
                    </Link>
                    <Link href="/login">
                        <a>
                            <button
                                className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                type="submit"
                            >
                                Login
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Index
