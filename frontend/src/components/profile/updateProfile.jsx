import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { loggedUser } from "@/store/authSlice";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(loggedUser); // Get the logged user data from the store

  // State for form fields
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Set form fields when user data changes
  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
  }, [user]);
console.log(user.id);
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = new FormData();
    userData.append("username", username);
    if (avatar) {
      userData.append("user_image", avatar);
    }
    if (currentPassword) {
      userData.append("currentPassword", currentPassword);
    }
    if (newPassword) {
      userData.append("newPassword", newPassword);
    }
  
    dispatch(updateUser({ id: id, userData }));
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  const userImageSrc = user.user_image ? user.user_image.url : "/profile.png";
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <Label htmlFor="avatar">Avatar</Label>
            <img
              alt="Your avatar"
              className=" rounded-full object-cover"
              height="96"
              src={userImageSrc || "/placeholder.svg"}
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="52"
            />
            <Input accept="image/*" id="avatar" type="file" onChange={handleFileChange} />
          </div>
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
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              placeholder="Enter your current password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              placeholder="Enter your new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <CardFooter>
            <Button size="sm" type="submit" className="ml-80 mt-2">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
