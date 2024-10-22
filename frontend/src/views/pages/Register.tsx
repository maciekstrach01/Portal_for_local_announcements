import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <div className="my-8">
                <h1 className="text-3xl">Sign up </h1>

                <p className="mt-1">
                    If you already have an account
                    <br />
                    You can{' '}
                    <Link
                        to="/login"
                        className="text-[#4D47C3] hover:underline"
                    >
                        Login here!
                    </Link>
                </p>
            </div>

            <input
                type="text"
                placeholder="First name"
                className="block w-full my-8 p-4 bg-[#F0EFFF] rounded-lg text-[#4D47C3] placeholder:text-[#A7A3FF] focus:outline-[#4D47C3]"
            />

            <input
                type="text"
                placeholder="Last name"
                className="block w-full my-8 p-4 bg-[#F0EFFF] rounded-lg text-[#4D47C3] placeholder:text-[#A7A3FF] focus:outline-[#4D47C3]"
            />

            <input
                type="email"
                placeholder="Email"
                className="block w-full my-8 p-4 bg-[#F0EFFF] rounded-lg text-[#4D47C3] placeholder:text-[#A7A3FF] focus:outline-[#4D47C3]"
            />

            <input
                type="password"
                placeholder="Password"
                className="block w-full my-8 p-4 bg-[#F0EFFF] rounded-lg text-[#4D47C3] placeholder:text-[#A7A3FF] focus:outline-[#4D47C3]"
            />

            <input
                type="password"
                placeholder="Confirm password"
                className="block w-full my-8 p-4 bg-[#F0EFFF] rounded-lg text-[#4D47C3] placeholder:text-[#A7A3FF] focus:outline-[#4D47C3]"
            />

            <button
                type="submit"
                className="block w-full my-8 p-4 bg-[#4D47C3] rounded-lg text-white font-medium"
            >
                Register
            </button>
        </>
    );
};

export default Register;
