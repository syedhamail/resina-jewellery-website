"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  userId: string;
  timestamp: string;
}

interface User {
  uid: string;
  email: string;
  orders: Order[];
}

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        window.location.href = "/login?redirect=/shmuq";
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      const usersMap: { [key: string]: User } = {};
      ordersData.forEach((order) => {
        if (!usersMap[order.userId]) {
          usersMap[order.userId] = { uid: order.userId, email: "", orders: [] };
        }
        usersMap[order.userId].orders.push(order);
      });

      setOrders(ordersData);
      setUsers(Object.values(usersMap));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate product quantities over time
  const productQuantities = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp).toLocaleDateString();
    order.items.forEach((item) => {
      if (!acc[date]) acc[date] = 0;
      acc[date] += item.quantity;
    });
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(productQuantities),
    datasets: [
      {
        label: "Product Quantities Over Time",
        data: Object.values(productQuantities),
        fill: false,
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
    ],
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <main className="bg-[#FAF3EB] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>
        Resina Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Total Orders</h2>
          <p className="text-2xl text-purple-600">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
          <p className="text-2xl text-purple-600">
            Rs {orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">Active Users</h2>
          <p className="text-2xl text-purple-600">{users.length}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Quantities Over Time</h2>
        <Line data={chartData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Orders</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID or Name..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Order ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2">{order.orderId}</td>
                  <td className="p-2">{order.shippingAddress.fullName}</td>
                  <td className="p-2">Rs {order.total}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{new Date(order.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}