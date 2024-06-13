import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  requestReset,
  validateReset,
  passwordReset,
} from "@/store/passwordResetSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleRequestReset = () => {
    toast.info('Requesting password reset...');
    dispatch(requestReset(email));
    setIsEmailVerified(true)
  };

  const handleValidateReset = () => {
    toast.info('Validating verification code...');
    dispatch(validateReset(code));
    setIsVerified(true);
    toast.success('Verification successful');
  };

  const handlePasswordReset = () => {
    toast.info('Resetting password...');
    dispatch(passwordReset({ code, password: newPassword }));
    toast.success('Password reset successful');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
<div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email and a new password to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleRequestReset}>Verify Email</Button>
          </div>
          {isEmailVerified &&(
          <Dialog>
            <DialogTrigger asChild>
              <Button>Enter Verification Code</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Verification Code</DialogTitle>
                <DialogDescription>
                  Please enter the verification code sent to your email.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="verificationCode" className="text-right">
                    Verification Code
                  </Label>
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleValidateReset}>
                  Verify
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          )}
        </CardContent>
        <CardFooter>
          {isVerified && (
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button onClick={handlePasswordReset}>Reset Password</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordResetForm;
