import NavbarAdmin from '@/components/navigation/navbarAdmin';
import { NavbarMobile } from '@/components/navigation/nvabar-mobile';
import TableCustomer from '@/components/table/table-customer';
import React from 'react'

export default function CreateOrdersPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max gap-4 items-start md:gap-8 lg:col-span-2">
            
          </div>
        </main>
      </div>
    </div>
  );
}
