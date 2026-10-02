import Transaction from "./Transaction";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { Transaction as TransactionType } from "@/types";

interface TransactionTableProps {
    transactions?: TransactionType[];
}

function TransactionTable({ transactions}: TransactionTableProps){
    if (!transactions) return null;

    if (transactions.length === 0) {
        return (
            <p 
                className="text-sm text-muted-foreground py-4"
                data-testid="no_transactions_message"
            >
                There are no transactions yet.
            </p>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Place</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction: TransactionType) => (
                        <Transaction key={transaction.id} {...transaction}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TransactionTable