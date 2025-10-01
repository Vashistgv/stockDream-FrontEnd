import { ChatMessage } from "@/types/chat.types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const StockQuoteTable: React.FC<{
  quotes: ChatMessage["quotes"];
}> = ({ quotes }) => {
  if (!quotes) return null;

  return (
    <div className="overflow-x-auto mt-2 rounded-lg border border-border dark:border-gray-700">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change %</TableHead>
            <TableHead className="text-right">High</TableHead>
            <TableHead className="text-right">Low</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(quotes).map(([symbol, q]) => (
            <TableRow key={symbol}>
              <TableCell>{symbol}</TableCell>
              <TableCell className="text-right">
                {q.current?.toFixed(2)}
              </TableCell>
              <TableCell
                className={`text-right font-semibold ${
                  q.changePct >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {q.changePct?.toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">{q.high?.toFixed(2)}</TableCell>
              <TableCell className="text-right">{q.low?.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
