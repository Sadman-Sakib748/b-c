import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { createUser, updateUserProfile } = useContext(AuthContext);


    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the data base')
                                    reset();
                                    Swal.fire({
                                        position: 'top-right',
                                        title: "user profile info updated",
                                        icon: "success",
                                        draggable: true,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => console.error(error))
            })
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss || signup</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col  md:flex-row-reverse">
                    <div className="text-center w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm md:w-1/2 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Your name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: "Name is required" })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            message: "Invalid email format"
                                        }
                                    })}
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/
                                            , message: "Must include uppercase, lowercase, number & special character"
                                        }
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='px-6'><small>New Here? <Link to="/login">Create an Account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;