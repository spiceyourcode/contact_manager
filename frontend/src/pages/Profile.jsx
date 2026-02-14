import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
    Ellipsis,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import contactService from "../api/contactService.js";
import React, { useState, useEffect } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "../components/ui/navbar";

export default function Profile() {
    const { user, logout, loading } = useAuth();
    const [contacts, setContacts] = useState([]);

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
                        <div >
                            {/* <span className="block">Change Your Password</span> */}
                            <Field className="w-[350px]">
                                <FieldLabel>Change Password</FieldLabel>
                                <Input
                                    className="border-black"
                                    id="input-demo-api-key"
                                    type="password"
                                />
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input
                                    className="border-black"
                                    id="input-demo-api-key"
                                    type="password"
                                />
                            </Field>
                            <Button variant="default" size="sm" className="mt-4 rounded-3xl w-[150px]">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
