"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Header from "../components/header";
import Footer from "../components/footer";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBncpf8PPEHrCBcztoQVf_8fDh5SDTNE1s",
  authDomain: "resina-website.firebaseapp.com",
  projectId: "resina-website",
  storageBucket: "resina-website.firebasestorage.app",
  messagingSenderId: "44423735107",
  appId: "1:44423735107:web:92c20ea60bbe9ccbd2f1f6",
  measurementId: "G-74QTMJTCPJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface Order {
  id: string;
  orderId: string;
  items: { name: string; quantity: number; price: number; total: string }[];
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  total: string;
  status: string;
  timestamp: string;
}

export default function UserDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || `User_${user.uid.slice(0, 5)}`);
        setUserEmail(user.email || "No email");
        fetchUserOrders(user.uid);
      } else {
        router.push("/login?redirect=/user");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserOrders = async (uid: string) => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "orders"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => router.push("/login"));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <main className="bg-[#FAF3EB] min-h-screen">
      <Header />
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: "'Georgia', serif" }}>
            My Dashboard
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
            <p className="text-gray-700"><strong>Name:</strong> {userName}</p>
            <p className="text-gray-700"><strong>Email:</strong> {userEmail}</p>
            <p className="text-gray-700"><strong>Total Orders:</strong> {orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Order ID</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="p-2">{order.orderId}</td>
                        <td className="p-2">Rs {order.total}</td>
                        <td className="p-2">{order.status}</td>
                        <td className="p-2">{new Date(order.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}