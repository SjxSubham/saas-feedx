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
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, ChartNoAxesCombined, X } from "lucide-react";
import Ratings from "./ratings";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  ColumnDef,
  PaginationState,
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
import { Button } from "@/components/ui/button";

type Feedback = InferSelectModel<typeof feedbacks>;

function Table(props: { data: Feedback[] }) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const positiveFeedback = props.data.filter((f) => f.rating !== null && f.rating >= 4).length;
  const negativeFeedback = props.data.filter((f) => f.rating !== null && f.rating <= 2).length;
  const neutralFeedback = props.data.length - (positiveFeedback + negativeFeedback);

  const total = props.data.length;
  const averageRating = total > 0
    ? (props.data.reduce((acc, curr) => acc + (curr.rating || 0), 0) / total).toFixed(1)
    : "0.0";
  const sentimentScore = total > 0
    ? Math.round(((positiveFeedback - negativeFeedback) / total) * 100)
    : 0;

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Rating", "Message"];
    const csvContent = [
      headers.join(","),
      ...props.data.map(f => [
        `"${f.userName || ''}"`,
        `"${f.userEmail || ''}"`,
        f.rating || 0,
        `"${f.message?.replace(/"/g, '""') || ''}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "feedback_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <div className="w-full lg:w-3/4">
        {/* Mobile Analytics Toggle Button */}
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <ChartNoAxesCombined className="w-6 h-6" />
        </button>
        <div className="w-full">
          <MyTable data={props.data} />
        </div>
      </div>

      <div className={`w-full lg:w-1/4 fixed inset-y-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-l border-white/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto custom-scrollbar
        ${showAnalytics ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:static lg:h-auto lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:overflow-visible'}`}>

        {/* Close button for mobile */}
        <button
          onClick={() => setShowAnalytics(false)}
          className="lg:hidden absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold tracking-tight glow-text text-foreground">Analytics</h1>
            </div>
            <Button size="sm" variant="outline" onClick={downloadCSV} className="h-8 text-xs neo-border">
              Export CSV
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4 rounded-xl flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-bold text-foreground">{total}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total</span>
            </div>
            <div className="glass-panel p-4 rounded-xl flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-bold text-primary">{averageRating}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Avg Rating</span>
            </div>
            <div className="glass-panel p-4 rounded-xl col-span-2 flex flex-row justify-between items-center px-6">
              <div className="text-left">
                <span className="text-2xl font-bold text-foreground">{sentimentScore}%</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Net Sentiment</p>
              </div>
              <div className={`h-2 w-20 rounded-full ${sentimentScore > 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' : 'bg-gradient-to-r from-red-500 to-red-300'}`} />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Feedback Summary</h2>
            <div className="p-2">
              <Pie
                data={{
                  labels: ["Positive", "Neutral", "Negative"],
                  datasets: [
                    {
                      data: [positiveFeedback, neutralFeedback, negativeFeedback],
                      backgroundColor: ["#a3e635", "#60a5fa", "#f87171"], // Lime, Blue, Red
                      borderColor: "transparent",
                      hoverOffset: 10,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#9ca3af", font: { size: 12 } },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Rating Distribution</h2>
            <div className="h-40">
              <Bar
                data={{
                  labels: ["1★", "2★", "3★", "4★", "5★"],
                  datasets: [
                    {
                      label: "Reviews",
                      data: [1, 2, 3, 4, 5].map(r => props.data.filter(f => f.rating === r).length),
                      backgroundColor: "#a3e635",
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { grid: { display: false }, ticks: { color: "#9ca3af" } },
                    y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9ca3af" } },
                  },
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </div>
        </div>
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
      header: "Name",
      cell: info => <span className="font-medium text-foreground">{info.getValue() as string}</span>
    },
    {
      accessorKey: "userEmail",
      header: "Email",
      cell: info => <span className="text-muted-foreground">{info.getValue() as string}</span>
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ getValue }) => <div className="flex"><Ratings rating={getValue() as number} count={5} /></div>,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: info => <span className="text-muted-foreground line-clamp-2">{info.getValue() as string}</span>
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
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground tracking-tight glow-text">Recent Feedback</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full">{data.length} entries</span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-muted/20 dark:bg-black/20">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 dark:bg-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50 dark:hover:bg-white/5 transition-colors border-b border-border last:border-0 group">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-muted-foreground group-hover:text-foreground transition-colors">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-2 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 border-border bg-transparent hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 border-border bg-transparent hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Table;


