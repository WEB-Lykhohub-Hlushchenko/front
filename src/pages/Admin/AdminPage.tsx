import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

// Styled Components
const AdminContainer = styled.div`
  padding: 20px;
`;

const TableContainer = styled.div`
  margin-top: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: left;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
  }

  button {
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const AdminPage: React.FC = () => {
    const [services, setServices] = useState([]);
    const [masters, setMasters] = useState([]);
    const [clients, setClients] = useState([]);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // Перевірка адміністратора
    useEffect(() => {
        const userEmail = localStorage.getItem("email");
        if (userEmail !== "admin@example.com") {
            navigate("/"); // Якщо це не адмін, перенаправляємо
        }
        fetchAllData();
    }, [navigate]);

    // Завантаження даних
    const fetchAllData = async () => {
        try {
            const [servicesRes, mastersRes, clientsRes, bookingsRes] = await Promise.all([
                axios.get("http://127.0.0.1:5000/services/"),
                axios.get("http://127.0.0.1:5000/masters/"),
                axios.get("http://127.0.0.1:5000/clients/"),
                axios.get("http://127.0.0.1:5000/bookings/")
            ]);

            console.log("Services data:", servicesRes.data);
            console.log("Masters data:", mastersRes.data);
            console.log("Clients data:", clientsRes.data);
            console.log("Bookings data:", bookingsRes.data);

            setServices(servicesRes.data);
            setMasters(mastersRes.data);
            setClients(clientsRes.data);
            setBookings(bookingsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };



    // Видалення рядка
    // Видалення рядка
    const handleDelete = async (endpoint: string, id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/${endpoint}/${id}`);
            fetchAllData(); // Оновлюємо дані
        } catch (error) {
            console.error("Error deleting row:", error);
        }
    };

// Оновлення рядка
    const handleUpdate = async (endpoint: string, id: number, updatedData: any) => {
        try {
            await axios.put(`http://127.0.0.1:5000/${endpoint}/${id}`, updatedData);
            fetchAllData(); // Оновлюємо дані
        } catch (error) {
            console.error("Error updating row:", error);
        }
    };


    // Компонент таблиці
    const renderTable = (data: any[], columns: string[], endpoint: string) => (
        <Table>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row: any) => (
                <tr key={row.id}>
                    {columns.map((col) => (
                        <td key={col}>
                            {col === "id" ? row[col] : (
                                <input
                                    defaultValue={row[col]}
                                    onBlur={(e) =>
                                        handleUpdate(endpoint, row.id, {
                                            [col]: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </td>
                    ))}
                    <td>
                        <button onClick={() => handleDelete(endpoint, row.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );

    return (
        <>
            <Header isAuthenticated={true} />
            <AdminContainer>
                <h1>Admin Panel</h1>
                <TableContainer>
                    <h2>Services</h2>
                    {renderTable(services, ["id", "name", "description"], "services")}

                    <h2>Masters</h2>
                    {renderTable(masters, ["id", "user_id", "service_id", "bio"], "masters")}

                    <h2>Clients</h2>
                    {renderTable(clients, ["id", "additional_info"], "clients")}

                    <h2>Bookings</h2>
                    {renderTable(bookings, ["id", "user_id", "master_id", "service_id", "booking_datetime"], "bookings")}
                </TableContainer>
            </AdminContainer>
        </>
    );
};

export default AdminPage;
