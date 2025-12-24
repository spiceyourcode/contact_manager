import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button";

export default function Profile(){
    const{user, logout, loading} = useAuth();
    
    if (loading) {
        return <div>Loading user data...</div>;
    }
    
    return(
        <div>
            <h2>Profile</h2>
            
            {user ? (
                <div>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <div>
                    <p>No user data available</p>
                    <p>Please log in to view profile</p>
                </div>
            )}
            
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
