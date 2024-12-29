"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Supplier = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "emmefilms Supplies", email: "emmefilms@gmail.com", phone: "123-456-7890" },
    { id: 2, name: "FilmGear Pro", email: "filmgear@outlook.com", phone: "987-654-3210" },
  ]);

  const { register, handleSubmit, reset } = useForm<Supplier>();

  const onSubmit = (data: Omit<Supplier, "id">) => {
    setSuppliers([...suppliers, { id: suppliers.length + 1, ...data }]);
    reset();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-4 rounded">
        <h2 className="text-lg font-semibold">Add New Supplier</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            {...register("name", { required: true })}
            placeholder="Supplier Name"
            className="col-span-1"
          />
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email Address"
            className="col-span-1"
          />
          <Input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="Phone Number"
            className="col-span-1"
          />
        </div>

        <Button type="submit" className="mt-2 bg-green-500 hover:bg-green-600">
          Add Supplier
        </Button>
      </form>
      <h1 className="text-xl font-bold my-4">Suppliers</h1>

      <div className="mb-6">
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Suppliers;
