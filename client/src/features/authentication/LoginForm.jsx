"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import toast from "react-hot-toast";

export function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleInput = () => {
    if (formErrors.email == true || formErrors.password == true) {
      setFormErrors((prev) => ({ ...prev, email: false, password: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      emailRef.current.value == "" ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)
    ) {
      setFormErrors((prev) => ({ ...prev, email: true }));
      return;
    } else if (passwordRef.current.value == "") {
      setFormErrors((prev) => ({ ...prev, password: true }));
      return;
    }

    try {
      const userData = await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();

      localStorage.setItem("auth", JSON.stringify(userData));
      dispatch(setCredentials(userData));
      navigate("/");
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        toast.error("No Server Response");
      } else if (err.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.status === 401) {
        toast.error("Unauthorized");
      } else if (err.status === 403) {
        toast.error(err.data.message);
      } else {
        toast.error("Login Failed");
      }
    }
  };
  return (
    <div className="flex-column content-center bg-black">
      <div className="shadow-input m-auto w-full max-w-md mt-25 mb-10 rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
          {isLoading ? "Logging in...." : "Welcome to the Jeopardy World"}
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              className={formErrors.email && "border-2 border-chart-1"}
              id="email"
              placeholder="example@example.com"
              type="email"
              ref={emailRef}
              onChange={handleInput}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              className={formErrors.password && "border-2 border-chart-1"}
              id="password"
              placeholder="••••••••"
              type="password"
              ref={passwordRef}
              onChange={handleInput}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={isLoading ? true : false}
          >
            Login &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="text-center">
            <p>
              Do not have an account yet?{" "}
              <Link to="/register" className="cursor-pointer hover:underline">
                Click here to register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
