"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Calendar,
  Star,
  Eye,
  EyeOff,
  Pin,
  Archive,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface FilterState {
  search: string;
  isRead: boolean | null;
  isPinned: boolean | null;
  isArchived: boolean | null;
  minRating: number | null;
  maxRating: number | null;
  startDate: string;
  endDate: string;
}

interface FeedbackFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

const initialFilters: FilterState = {
  search: "",
  isRead: null,
  isPinned: null,
  isArchived: null,
  minRating: null,
  maxRating: null,
  startDate: "",
  endDate: "",
};

export default function FeedbackFilters({
  onFilterChange,
  totalCount,
  filteredCount,
}: FeedbackFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange({ ...filters, search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    filters.isRead,
    filters.isPinned,
    filters.isArchived,
    filters.minRating,
    filters.maxRating,
    filters.startDate,
    filters.endDate,
    onFilterChange,
  ]);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.isRead !== null ||
    filters.isPinned !== null ||
    filters.isArchived !== null ||
    filters.minRating !== null ||
    filters.maxRating !== null ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  const activeFilterCount = [
    filters.isRead !== null,
    filters.isPinned !== null,
    filters.isArchived !== null,
    filters.minRating !== null || filters.maxRating !== null,
    filters.startDate !== "" || filters.endDate !== "",
  ].filter(Boolean).length;

  return (
    <div className="space-y-3 mb-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search feedbacks by name, email, or message..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {filters.search && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 min-w-[120px]">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            {/* Status Filters */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Read Status
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.isRead === true}
              onCheckedChange={(checked) =>
                handleFilterChange("isRead", checked ? true : null)
              }
            >
              <Eye className="mr-2 h-4 w-4 text-green-500" />
              Read
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.isRead === false}
              onCheckedChange={(checked) =>
                handleFilterChange("isRead", checked ? false : null)
              }
            >
              <EyeOff className="mr-2 h-4 w-4 text-blue-500" />
              Unread
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Pinned Filter */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Pin className="h-4 w-4" />
              Pinned Status
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.isPinned === true}
              onCheckedChange={(checked) =>
                handleFilterChange("isPinned", checked ? true : null)
              }
            >
              <Pin className="mr-2 h-4 w-4 text-purple-500" />
              Pinned only
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Archive Filter */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Archive Status
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.isArchived === false}
              onCheckedChange={(checked) =>
                handleFilterChange("isArchived", checked ? false : null)
              }
            >
              Active (not archived)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.isArchived === true}
              onCheckedChange={(checked) =>
                handleFilterChange("isArchived", checked ? true : null)
              }
            >
              <Archive className="mr-2 h-4 w-4 text-yellow-500" />
              Archived only
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Rating Filter */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating Filter
            </DropdownMenuLabel>
            <div className="px-2 py-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label
                    htmlFor="minRating"
                    className="text-xs text-muted-foreground"
                  >
                    Min
                  </Label>
                  <select
                    id="minRating"
                    value={filters.minRating ?? ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "minRating",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} ★
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-muted-foreground mt-4">-</span>
                <div className="flex-1">
                  <Label
                    htmlFor="maxRating"
                    className="text-xs text-muted-foreground"
                  >
                    Max
                  </Label>
                  <select
                    id="maxRating"
                    value={filters.maxRating ?? ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxRating",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} ★
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Date Range Filter */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </DropdownMenuLabel>
            <div className="px-2 py-2 space-y-2">
              <div>
                <Label
                  htmlFor="startDate"
                  className="text-xs text-muted-foreground"
                >
                  From
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label
                  htmlFor="endDate"
                  className="text-xs text-muted-foreground"
                >
                  To
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="w-full gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset all filters
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reset Button (visible when filters are active) */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetFilters}
                title="Reset all filters"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Pills & Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Results count */}
          <span className="text-sm text-muted-foreground">
            {filteredCount === totalCount ? (
              `${totalCount} feedback${totalCount !== 1 ? "s" : ""}`
            ) : (
              <>
                Showing {filteredCount} of {totalCount} feedback
                {totalCount !== 1 ? "s" : ""}
              </>
            )}
          </span>

          {/* Active filter pills */}
          <AnimatePresence>
            {filters.isRead !== null && (
              <FilterPill
                label={filters.isRead ? "Read" : "Unread"}
                onRemove={() => handleFilterChange("isRead", null)}
              />
            )}
            {filters.isPinned === true && (
              <FilterPill
                label="Pinned"
                onRemove={() => handleFilterChange("isPinned", null)}
              />
            )}
            {filters.isArchived !== null && (
              <FilterPill
                label={filters.isArchived ? "Archived" : "Active"}
                onRemove={() => handleFilterChange("isArchived", null)}
              />
            )}
            {(filters.minRating !== null || filters.maxRating !== null) && (
              <FilterPill
                label={`Rating: ${filters.minRating ?? 1}-${filters.maxRating ?? 5}★`}
                onRemove={() => {
                  handleFilterChange("minRating", null);
                  handleFilterChange("maxRating", null);
                }}
              />
            )}
            {(filters.startDate || filters.endDate) && (
              <FilterPill
                label={`Date: ${filters.startDate || "..."} - ${filters.endDate || "..."}`}
                onRemove={() => {
                  handleFilterChange("startDate", "");
                  handleFilterChange("endDate", "");
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Filter Pill Component
function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}

export type { FilterState };
