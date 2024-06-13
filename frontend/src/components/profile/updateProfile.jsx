import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/store/userSlice';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { logout, loggedUser } from '@/store/authSlice'; // Import logout action
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(loggedUser);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const [, setLoading] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append('username', username);

    if (password) {
      userData.append('password', password);
    }

    try {
      setLoading(true);
      // Dispatch async action to update user
      await dispatch(updateUser({ id: id, userData }));
      setLoading(false);

      toast.success('Your profile information has been updated.');

  setTimeout(() => {
        dispatch(logout()); 
        localStorage.removeItem('user'); 
        window.location.replace('/'); 
      }, 5000); 
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred');
      // Handle error scenario, e.g., show error message
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" value={email} readOnly />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              placeholder="Enter your new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <CardFooter>
            <Button size="sm" type="submit" className="ml-80 mt-2">
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default UpdateProfile;

