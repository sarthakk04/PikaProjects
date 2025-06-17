// app/admin/layout.js
"use client";
import AdminLayout from '../../components/admin/Admin';

export default function RootLayout({ children }) {
  
  return <AdminLayout>{children}</AdminLayout>;
}