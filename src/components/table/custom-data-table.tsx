/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Columns, ChevronDown, Search } from "lucide-react";

interface DataTableProps {
  data: Record<string, any>[];
  headers: { key: string; label: string }[];
  itemsPerPageOptions?: number[];
  initialItemsPerPage?: number;
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (item: Record<string, any>) => void;
}

export default function CustomDataTable({
  data,
  headers,
  itemsPerPageOptions = [5, 10, 15, 20],
  initialItemsPerPage = 10,
  onEdit,
  onDelete,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(headers.map((h) => h.key));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) => headers.some((header) => String(item[header.key]).toLowerCase().includes(searchTerm.toLowerCase())));
  }, [data, headers, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) => (prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey]));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;
    const ellipsisThreshold = 2;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Mostrar siempre la primera página
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Mostrar puntos suspensivos si es necesario
      if (currentPage > ellipsisThreshold + 1) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Mostrar la página actual y las páginas circundantes
      const startPage = currentPage > 2 ? currentPage : Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Mostrar puntos suspensivos si es necesario
      if (currentPage < totalPages - ellipsisThreshold) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Mostrar siempre la última página
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder="Buscar..." className="pl-8" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="flex gap-2 max-sm:w-full justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border border-input bg-transparent text-sm text-foreground">
                <Columns className="mr-2 h-4 w-4" />
                Columnas
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {headers.map((header) => (
                <DropdownMenuCheckboxItem
                  key={header.key}
                  checked={visibleColumns.includes(header.key)}
                  onCheckedChange={() => toggleColumnVisibility(header.key)}>
                  {header.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select onValueChange={handleItemsPerPageChange} defaultValue={String(initialItemsPerPage)}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Selecciona elementos por página" />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option} por página
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full overflow-auto rounded-lg border">
        <div className="min-w-full inline-block align-middle max-w-1">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers
                    .filter((header) => visibleColumns.includes(header.key))
                    .map((header) => (
                      <TableHead key={header.key} className="whitespace-nowrap">
                        {header.label}
                      </TableHead>
                    ))}
                  <TableHead className="whitespace-nowrap">Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item, index) => (
                  <TableRow key={index}>
                    {headers
                      .filter((header) => visibleColumns.includes(header.key))
                      .map((header) => (
                        <TableCell key={header.key} className="whitespace-nowrap">
                          {item[header.key]}
                        </TableCell>
                      ))}
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit && onEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete && onDelete(item)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
