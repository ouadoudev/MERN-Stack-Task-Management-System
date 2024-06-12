import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { registerUser } from "@/store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);


      // Dispatch registerUser action
      await dispatch(registerUser(formData));

      toast.success("Registration successful!");
      navigate("/email-sent");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while registering."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
          <Form>
            <form
              className=" pt-1 flex flex-col items-center justify-center gap-4 px-5 py-20 w-full max-w-md mx-auto text-lg"
              onSubmit={handleSubmit}
            >
              <div className="text-center mt-4">
                <p className="text-4xl font-bold pb-1">
                  Register to get started
                </p>
                <p className="text-l text-gray-500">
                  Join Us in Shaping the Future of Learning
                </p>
              </div>
              <Label className="pr-[82%] " htmlFor="username">
                Username:
              </Label>
              <Input
                className="h-[32px]"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Label className="pr-[90%] " htmlFor="email">
                Email:
              </Label>
              <Input
                className="h-[32px]"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label className="pr-[82%] " htmlFor="password">
                Password:
              </Label>
              <Input
                className="h-[32px]"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex pr-[45%] text-mt-0">
                <Label className="flex items-center dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  />
                  <span className="ml-2">
                    I agree to the {""}
                    <span className="underline">privacy policy</span>
                  </span>
                </Label>
              </div>

              <Button
                className="bg-[#090909] w-[300px] h-9"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
              <Button className="bg-[#090909] w-[300px] h-9" type="submit">
                {"Sign up with Google"}
              </Button>
              <div className="text-center">
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    className="text-indigo-600 hover:text-amber-500"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
