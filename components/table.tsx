// "use client";
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
// import Ratings from './ratings';

// import {
//   Column,
//   ColumnDef,
//   PaginationState,
//   Table as TanstackTable,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table'

// import { InferSelectModel } from 'drizzle-orm';
// import { feedbacks, projects } from '@/db/schema';

// type Feedback = InferSelectModel<typeof feedbacks>;

// function Table(props: { data: Feedback[] }) {
    

//   const rerender = React.useReducer(() => ({}), {})[1]

//   const columns = React.useMemo<ColumnDef<Feedback>[]>(
//     () => [
//       {
//         accessorKey: 'userName',
//         header: 'First Name',
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => row.userEmail,
//         id: 'userEmail',
//         cell: info => info.getValue(),
//         header: () => <span>Email</span>,
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => row.rating,
//         id: 'rating',
//         cell: info => info.getValue()=== null ? <span>N/A</span> : <Ratings rating={info.getValue() as number} count={5} />,
//         header: () => <span>Rating</span>,
//         footer: props => props.column.id,
//       },
//       {
//         accessorKey: 'message',
//         header: () => 'Message',
//         footer: props => props.column.id,
//         size: 400,
//         minSize: 200,
//         maxSize: 600,
//       },
      
//     ],
//     []
//   )

  
  

//   return (
//     <>
//       <MyTable
//         {...{
//           data: props.data,
//           columns,
//         }}
//       />
//       <hr />
      
//     </>
//   )
// }

// function MyTable({
//   data,
//   columns,
// }: {
//   data: Feedback[]
//   columns: ColumnDef<Feedback>[]
// }) {
//   const [pagination, setPagination] = React.useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   })

//   const table = useReactTable({
//     columns,
//     data,
//     debugTable: true,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//     //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
//     state: {
//       pagination,
//     },
//     // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
//   })

//   return (
//     <div className="p-2 mt-5">
//       <div className="h-2 " />
//       <table className='w-full'>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id} className='border-b border-slate-300'>
//               {headerGroup.headers.map(header => {
//                 return (
//                   <th key={header.id} className="text-left pb-2 bg-gray-50 rounded-t-md p-4"colSpan={header.colSpan}>
//                     <div
//                       {...{
//                         className: header.column.getCanSort()
//                           ? 'cursor-pointer select-none'
//                           : '',
//                         onClick: header.column.getToggleSortingHandler(),
//                       }}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {{
//                         asc: ' 🔼',
//                         desc: ' 🔽',
//                       }[header.column.getIsSorted() as string] ?? null}
//                       {header.column.getCanFilter() ? (
//                         <div className='mt-2'>
//                           <Filter column={header.column} table={table} />
//                         </div>
//                       ) : null}
//                     </div>
//                   </th>
//                 )
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map(cell => {
//                   return (
//                     <td key={cell.id} className="p-4 border-b"style={{
//                         width: cell.column.
//                         getSize(),
//                     }}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   )
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1 bg-gray-50 cursor-pointer"
//           onClick={() => table.firstPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           <ChevronsLeft/>
//         </button>
//         <button
//           className="border rounded p-1 bg-gray-50 cursor-pointer"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
          
//           <ChevronLeft/>
//         </button>
//         <button
//           className="border rounded p-1 bg-gray-50 cursor-pointer"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           <ChevronRight/>
//         </button>
//         <button
//           className="border rounded p-1 cursor-pointer"
//           onClick={() => table.lastPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           <ChevronsRight/>
//         </button>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             min="1"
//             max={table.getPageCount()}
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               table.setPageIndex(page)
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={e => {
//             table.setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   )
// }

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: TanstackTable<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       className="w-36 border shadow rounded p-1 text-slate-800 font-thin"
//       onChange={e => column.setFilterValue(e.target.value)}
//       onClick={e => e.stopPropagation()}
//       placeholder={`Search...`}
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//     />
//   )
// }

// export default Table;


// **********************************************

// "use client";

// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from "lucide-react";
// import Ratings from "./ratings";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Column,
//   ColumnDef,
//   PaginationState,
//   Table as TanstackTable,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { InferSelectModel } from "drizzle-orm";
// import { feedbacks } from "@/db/schema";

// import "chart.js/auto";

// type Feedback = InferSelectModel<typeof feedbacks>;

// function Table(props: { data: Feedback[] }) {
//   const positiveFeedback = props.data.filter((f) => f.rating !== null && f.rating >= 4).length;
//   const negativeFeedback = props.data.filter((f) => f.rating !== null && f.rating <= 2).length;
//   const neutralFeedback = props.data.length - (positiveFeedback + negativeFeedback);

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row gap-8 p-4">
//         <div className="w-full lg:w-1/2 bg-slate-200 p-4 shadow rounded-xl">
//           <h2 className="text-lg font-bold mb-4">Feedback Summary</h2>
//           <Pie
//             data={{
//               labels: ["Positive", "Neutral", "Negative"],
//               datasets: [
//                 {
//                   data: [positiveFeedback, neutralFeedback, negativeFeedback],
//                   backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
//                 },
//               ],
//             }}
//           />
//         </div>
//         <div className="w-full lg:w-1/2 bg-slate-200 p-4 shadow rounded-lg">
//           <h2 className="text-lg font-bold mb-4">Rating Distribution</h2>
//           <Bar
//             data={{
//               labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
//               datasets: [
//                 {
//                   label: "Number of Reviews",
//                   data: [
//                     props.data.filter((f) => f.rating === 1).length,
//                     props.data.filter((f) => f.rating === 2).length,
//                     props.data.filter((f) => f.rating === 3).length,
//                     props.data.filter((f) => f.rating === 4).length,
//                     props.data.filter((f) => f.rating === 5).length,
//                   ],
//                   backgroundColor: "#007bff",
//                 },
//               ],
//             }}
//           />
//         </div>
//       </div>
//       <MyTable data={props.data} />
//     </>
//   );
// }

// function MyTable({ data }: { data: Feedback[] }) {
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const columns: ColumnDef<Feedback>[] = [
//     {
//       accessorKey: "userName",
//       header: "First Name",
//     },
//     {
//       accessorKey: "userEmail",
//       header: "Email",
//     },
//     {
//       accessorKey: "rating",
//       header: "Rating",
//       cell: ({ getValue }) => <Ratings rating={getValue() as number} count={5} />,
//     },
//     {
//       accessorKey: "message",
//       header: "Message",
//     },
//   ];

//   const table = useReactTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//     state: { pagination },
//   });

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <table className="w-full border-collapse">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} className="border-b">
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} className="p-3 text-left">
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-b">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="p-3">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;



// / **************
// I hv added the Analytics, Bar , Pie section in the Page
"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, ChartNoAxesCombined } from "lucide-react";
import Ratings from "./ratings";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import {
  Column,
  ColumnDef,
  PaginationState,
  Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { InferSelectModel } from "drizzle-orm";
import { feedbacks } from "@/db/schema";

import "chart.js/auto";

type Feedback = InferSelectModel<typeof feedbacks>;

function Table(props: { data: Feedback[] }) {
  const positiveFeedback = props.data.filter((f) => f.rating !== null && f.rating >= 4).length;
  const negativeFeedback = props.data.filter((f) => f.rating !== null && f.rating <= 2).length;
  const neutralFeedback = props.data.length - (positiveFeedback + negativeFeedback);

  const labels = props.data.map((_, index) => `Feedback ${index + 1}`);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 relative">
      <div className="w-full lg:w-3/4">
        <MyTable data={props.data} />
      </div>
      <div className="w-full lg:w-1/4 bg-white p-4 shadow-2xl rounded-lg right-4 top-16 h-auto flex flex-col fixed gap-4 backdrop-blur-md overflow-y-auto max-h-screen">
      <h1 className="text-xl flex gap-2 font-bold">Analytics<ChartNoAxesCombined /></h1>
        <h2 className="text-lg font-semibold mb-2">Feedback Summary</h2>
        <Pie
          data={{
            labels: ["Positive", "Neutral", "Negative"],
            datasets: [
              {
                data: [positiveFeedback, neutralFeedback, negativeFeedback],
                backgroundColor: ["#34D399", "#60A5FA", "#F87171"],
                borderColor: "#ffffff",
                borderWidth: 2,
                hoverOffset: 10,
              
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: 15,
                  color: "#333",
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                bodyColor: "#fff",
                titleColor: "#fff",
                bodyFont: {
                  size: 14,
                },
                padding: 10,
                cornerRadius: 5,
              },
            },
          }}
        />
        <Bar
          data={{
            labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
            datasets: [
              {
                label: "Number of Reviews",
                data: [
                  props.data.filter((f) => f.rating === 1).length,
                  props.data.filter((f) => f.rating === 2).length,
                  props.data.filter((f) => f.rating === 3).length,
                  props.data.filter((f) => f.rating === 4).length,
                  props.data.filter((f) => f.rating === 5).length,
                ],
                backgroundColor: ["#F59E0B", "#EF4444", "#6366F1", "#10B981", "#3B82F6"],
                borderColor: "#ffffff",
                borderWidth: 5,
                hoverBackgroundColor: "#1E40AF",
                hoverBorderWidth: 3,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: 15,
                  color: "#333",
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                bodyColor: "#fff",
                titleColor: "#fff",
                bodyFont: {
                  size: 14,
                },
                padding: 10,
                cornerRadius: 5,
              },
            },
          }}
        />
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Feedback Over User",
                data: props.data.map((f) => f.rating),
                borderColor: "#EC4899",
                backgroundColor: "rgba(236, 72, 153, 0.2)",
                fill: true,
                pointBackgroundColor: "#9333EA",
                pointBorderColor: "#FFFFFF",
                pointHoverBackgroundColor: "#FBBF24",
                pointHoverBorderColor: "#F59E0B",
                hoverBorderWidth: 3,
                hoverBorderColor: "#DC2626",
                hoverBackgroundColor: "#FFB703",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: 20,
                  color: "#333",
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                bodyColor: "#fff",
                titleColor: "#fff",
                bodyFont: {
                  size: 12,
                },
                padding: 10,
                cornerRadius: 5,
              },
            },
          }}
        />
        

      </div>
    </div>
  );
}

function MyTable({ data }: { data: Feedback[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "userName",
      header: "First Name",
    },
    {
      accessorKey: "userEmail",
      header: "Email",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ getValue }) => <Ratings rating={getValue() as number} count={5} />,
    },
    {
      accessorKey: "message",
      header: "Message",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className="p-4 bg-white shadow-2xl rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
       <div className="flex items-center gap-2">
         <button
          className="border rounded p-1 bg-gray-50 cursor-pointer"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft/>
        </button>
        <button
          className="border rounded p-1 bg-gray-50 cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          
          <ChevronLeft/>
        </button>
        <button
          className="border rounded p-1 bg-gray-50 cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight/>
        </button>
        <button
          className="border rounded p-1 cursor-pointer"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight/>
        </button>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
//   )
// }
   
        )
      }
function Filter({
    column,
    table,
  }: {
    column: Column<any, any>
    table: TanstackTable<any>
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    return typeof firstValue === 'number' ? (
      <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
    ) : (
      <input
        className="w-36 border shadow rounded p-1 text-slate-800 font-thin"
        onChange={e => column.setFilterValue(e.target.value)}
        onClick={e => e.stopPropagation()}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
    )
  }

export default Table;

