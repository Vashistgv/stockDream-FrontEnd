"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import API from "@/utils/API";
import { useAuth } from "@/contexts/AuthContext";

// shadcn table + badge
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Transaction = {
  _id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  source: "JOIN_GROUP" | "WIN" | "LOAD" | "ADMIN_ADJUST";
  description?: string;
  createdAt: string;
};

export default function WalletHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // Use authenticated endpoint (no userId required server-side)
      const res = await API.get(
        `/wallet/history/${user?._id}?page=${page}&limit=20${
          filterType !== "all" ? `&type=${filterType}` : ""
        }`
      );
      // backend should return { transactions, total, page, limit }
      setTransactions(res.data.transactions ?? []);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterType]);

  const fmtDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() : "";
  const fmtTime = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  return (
    <div className="min-h-screen bg-background px-4 py-8 flex justify-center items-center">
      <Card className="w-full max-w-3xl min-h-[85vh] shadow-lg border border-border rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="px-6 py-4 bg-card/40 border-b border-border/30">
          <CardTitle className="text-center text-lg sm:text-xl font-semibold">
            Wallet History
          </CardTitle>
          {/* Filter */}
          <div className="flex gap-3">
            <Select
              onValueChange={(val) => setFilterType(val)}
              defaultValue="all"
            >
              <SelectTrigger className="w-full h-10 text-sm rounded-md border border-border/30 px-3 bg-transparent">
                <SelectValue placeholder="All Transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="CREDIT">Credits Only</SelectItem>
                <SelectItem value="DEBIT">Debits Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-4 py-5 space-y-5">
          {/* List area wrapper */}
          <div className="border border-border rounded-lg overflow-hidden">
            <ScrollArea className="h-[65vh]">
              {/* MOBILE: stacked cards */}
              <div className="sm:hidden p-4 space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 bg-muted/10 dark:bg-muted/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">💳</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No transactions found
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Your wallet activity will appear here
                    </p>
                  </div>
                ) : (
                  transactions.map((txn) => (
                    <div
                      key={txn._id}
                      className="p-4 rounded-lg border border-border/30 bg-card/10 dark:bg-card/30 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p
                            className={`text-lg font-bold ${
                              txn.type === "CREDIT"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount}
                          </p>
                          <p className="text-sm text-foreground/90 mt-1">
                            {txn.description ?? txn.source}
                          </p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div>{fmtDate(txn.createdAt)}</div>
                          <div className="mt-1">{fmtTime(txn.createdAt)}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* DESKTOP (sm+): table */}
              <div className="hidden sm:block overflow-x-auto max-h-[65vh]">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 bg-muted/10 dark:bg-muted/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl">💳</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No transactions found
                    </p>
                  </div>
                ) : (
                  <Table className="w-full text-base border border-border rounded-xl overflow-hidden">
                    {/* Sticky Header */}
                    <TableHeader className="bg-muted/40 sticky top-0 z-10 shadow-sm">
                      <TableRow>
                        <TableHead className="w-36 px-6 py-4 text-left font-semibold text-muted-foreground tracking-wide">
                          Amount
                        </TableHead>
                        <TableHead className="px-6 py-4 font-semibold text-muted-foreground tracking-wide">
                          Description
                        </TableHead>
                        <TableHead className="w-36 px-6 py-4 font-semibold text-muted-foreground tracking-wide">
                          Date
                        </TableHead>
                        <TableHead className="w-28 px-6 py-4 font-semibold text-muted-foreground tracking-wide">
                          Time
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {transactions.map((txn, idx) => {
                        const date = new Date(txn.createdAt);
                        return (
                          <TableRow
                            key={txn._id}
                            className={`hover:bg-accent/30 transition-colors ${
                              idx % 2 === 0
                                ? "bg-background"
                                : "bg-muted/20 dark:bg-muted/10"
                            }`}
                          >
                            {/* Amount */}
                            <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                              <span
                                className={`${
                                  txn.type === "CREDIT"
                                    ? "text-green-600"
                                    : "text-red-600"
                                } font-bold text-lg`}
                              >
                                {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount}
                              </span>
                            </TableCell>

                            {/* Description */}
                            <TableCell className="px-6 py-4 text-foreground/90 capitalize">
                              {txn.description ?? txn.source}
                            </TableCell>

                            {/* Date */}
                            <TableCell className="px-6 py-4 text-muted-foreground">
                              {date.toLocaleDateString()}
                            </TableCell>

                            {/* Time */}
                            <TableCell className="px-6 py-4 text-muted-foreground">
                              {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Pagination Footer */}
          <div className="flex items-center justify-between gap-4 px-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 w-[80px] "
            >
              Prev
            </Button>

            <div className="text-sm font-medium text-muted-foreground px-4 py-1 rounded-full bg-muted/10 border border-border/30">
              Page {page}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 w-[80px]"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
