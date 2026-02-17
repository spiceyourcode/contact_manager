import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button";
import { Spinner } from "@/components/ui/spinner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import contactService from "../api/contactService.js";
import authService from "../api/authService.js";
import { useState, useEffect } from "react";
import { Field , FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "../components/ui/navbar";

export default function Profile() {
    const { user, logout, loading } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");
    const [changePasswordSuccess, setChangePasswordSuccess] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const loadContacts = async () => {
        try {
            const res = await contactService.getContacts();
            setContacts(res.data);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Error loading contacts:", error);
            return [];
        }
    };

    const handleChangePassword = async () => {
        console.log("Change password button clicked");
        // Reset messages
        setChangePasswordError("");
        setChangePasswordSuccess("");

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setChangePasswordError("All password fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setChangePasswordError("New password and confirmation do not match");
            return;
        }

        if (newPassword.length < 6) {
            setChangePasswordError("New password must be at least 6 characters long");
            return;
        }

        if (currentPassword === newPassword) {
            setChangePasswordError("New password must be different from current password");
            return;
        }

        setIsChangingPassword(true);

        try {
            console.log("Calling changePassword API with:", { currentPassword, newPassword });
            const response = await authService.changePassword({
                currentPassword,
                newPassword
            });
            console.log("Change password response:", response);

            setChangePasswordSuccess("Password changed successfully!");
            toast.success("Password changed successfully!");
            
            // Clear form fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error("Change password error:", error);
            console.error("Error response:", error.response);
            console.error("Error status:", error.response?.status);
            
            let errorMessage = "Failed to change password. Please try again.";
            
            if (error.response?.status === 401) {
                errorMessage = "Current password is incorrect";
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setChangePasswordError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsChangingPassword(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="size=8" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            
            <Card className="max-w-4xl mx-auto mt-10 shadow-sm rounded-4xl border-none bg-gray-200">
                <CardContent>
                    <div className="flex flex-row gap-12 items-center">
                        <div>
                            <Avatar className="h-[250px] aspect-square w-auto  bg-white grid place-items-center text-3xl">
                                {user?.username ? user.username.charAt(0).toUpperCase() : "#"}
                            </Avatar>
                        </div>
                        <div>
                            <h3 className="text-2xl mb-6 font-bold">{user?.username}</h3>
                            <p className="text-sm text-slate-400">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card className="max-w-4xl mx-auto mt-10 shadow-sm rounded-4xl border-none bg-gray-200">
                <CardHeader>
                    <CardTitle className= "grid grid-cols-2 gap-4">
                        <h2>My Contact Stats</h2>
                        <h2>Change Password</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="max-w-50 flex flex-col gap-2.5">
                                <h6 className="text-[8px] block">Total Contacts</h6>
                                <Separator className="bg-gray-800 h-[2px] mb-2 " />
                                <Avatar>
                                    <span className="text-xl w-fit aspect-square h-auto bg-white grid place-items-center">
                                        {contacts.length}
                                    </span>
                                </Avatar>
                            </div>

                            <div className="mt-3 max-w-50 flex flex-col gap-2.5">
                                <h6 className="text-[8px]">Total Contacts</h6>
                                <Separator className="bg-gray-800 h-[2px] mb-2" />
                                <Avatar>
                                    <span className="text-xl w-fit aspect-square h-auto bg-white grid place-items-center">
                                        {contacts.length}
                                    </span>
                                </Avatar>
                            </div>
                        </div>
                        {/* Change Password */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                            <Field className="w-[350px]">
                                <FieldLabel>Current Password</FieldLabel>
                                <Input
                                    className="border-black"
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    disabled={isChangingPassword}
                                />
                                <FieldLabel>New Password</FieldLabel>
                                <Input
                                    className="border-black"
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={isChangingPassword}
                                />
                                <FieldLabel>Confirm New Password</FieldLabel>
                                <Input
                                    className="border-black"
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isChangingPassword}
                                />
                            </Field>
                            
                            {changePasswordError && (
                                <div className="text-red-500 text-sm mt-2">{changePasswordError}</div>
                            )}
                            
                            {changePasswordSuccess && (
                                <div className="text-green-500 text-sm mt-2">{changePasswordSuccess}</div>
                            )}
                            
                            <Button 
                                onClick={handleChangePassword} 
                                variant="default" 
                                size="sm" 
                                className="mt-4 rounded-3xl w-[150px]"
                                disabled={isChangingPassword}
                            >
                                {isChangingPassword ? "Changing..." : "Change Password"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
