
import '../css/profile.css'
import NavbarComponent from '../components/NavbarComponent'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Order from '../components/Order'

export default function ProfilePage() {
    const {user} = useAuth();
    // console.log("Helloo", user);
    const [myorders, setMyOrders] = useState<any>([])
    const fetchOrders = async () =>{

        try {
          let uri = "http://localhost:8000/user/get-orders"
          const response = await axios.post(uri, {user_id: user._id})
          console.log(response.data)
          setMyOrders(response.data)

        }
        catch(error:any){
          console.log(error.response.data);
    
        }
      }
    
      useEffect(()=>{
        fetchOrders()
      }, [])

  return (
    <>
    <NavbarComponent />

    <div className="container-profile">
            <div className="profile">
                <h2>Profile</h2>
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
                <h3>My Orders</h3>
                <div className="orders">
                    {/* {JSON.stringify(myorders.orders)} */}
                    {myorders.orders && myorders.orders.map((item:any)=>(
                        <Order order={item} />
                    ))}
                    {/* <div className="order-card">
                        <div className="order-details">
                            <p><strong>Items:</strong></p>
                            <p><strong>Total Price:</strong> $22.00</p>
                            <p><strong>Status:</strong> In Progress</p>
                        </div>
                    </div> */}
                    {/* {myorders.map((item:any)=>{
                      <Order order={item} />
                    })} */}
                    {/* {//<!-- Add more order cards here -->} */}
                </div>
            </div>
        </div>
    </>
  )
}
