"use client";

import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl text-primary font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {onNew && !newButtonHref && (
        <Button
          disabled={disabled || isCreating}
          size="sm"
          className="gap-x-2 shadow-sm hover:shadow transition-all"
          onClick={onNew}
        >
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}

      {!onNew && newButtonHref && (
        <Button size="sm" className="gap-x-2 shadow-sm hover:shadow" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

interface EntityContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
}

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen w-full flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-5 h-full">
          {search}
          {children}
        </div>

        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="max-w-[230px] pl-10 py-2 rounded-md border bg-background focus-visible:ring-1 shadow-none transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1 || disabled}
          size="sm"
          variant="outline"
          className="rounded-lg"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Prev
        </Button>

        <Button
          disabled={page === totalPages || disabled || page === 0}
          size="sm"
          variant="outline"
          className="rounded-lg"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4 animate-fadeIn">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4 animate-fadeIn">
      <AlertTriangleIcon className="size-6 text-destructive" />
      {!!message && (
        <p className="text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed bg-background/60 backdrop-blur-md p-10 rounded-xl shadow-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-muted/50 p-4 rounded-lg">
          <PackageOpenIcon className="size-6 text-muted-foreground" />
        </EmptyMedia>
      </EmptyHeader>

      <EmptyTitle className="text-lg font-semibold">No Items</EmptyTitle>

      {message && (
        <EmptyDescription className="text-sm text-muted-foreground">
          {message}
        </EmptyDescription>
      )}

      {!!onNew && (
        <EmptyContent>
          <Button className="mt-2 gap-x-2 shadow-sm hover:shadow-md">
            <PlusIcon className="size-4" />
            Add item
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center py-10 animate-fadeIn">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item: T, index: number) => (
        <div
          key={getKey ? getKey(item, index) : index}
          className="animate-fadeIn"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemove = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    if (onRemove) await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 rounded-xl border border-transparent bg-background hover:bg-muted/40 transition-all shadow-sm", // modern Notion-like
          "focus-within:ring-2 focus-within:ring-primary/20",
          isRemoving && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0 gap-4">
          <div className="flex items-center gap-4">
            {/* Image/Icon */}
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted/50 text-muted-foreground overflow-hidden">
              {image}
            </div>

            {/* Title + Subtitle */}
            <div className="flex flex-col">
              <CardTitle className="text-base font-medium leading-tight">
                {title}
              </CardTitle>

              {subtitle && (
                <CardDescription className="text-xs opacity-70 mt-0.5">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>

          {/* Actions */}
          {(actions || onRemove) && (
            <div className="flex items-center gap-x-2">
              {actions}

              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-md hover:bg-muted/70"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="rounded-md shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      onClick={handleRemove}
                      className="text-destructive focus:text-destructive"
                    >
                      <TrashIcon className="size-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
