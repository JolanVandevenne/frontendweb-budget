import { TRANSACTION_DATA } from "@/api/mock_data";
import type { Transaction as TransactionType } from "@/types";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useMemo } from "react";
import TransactionTable from '@/components/transactions/TransactionTable'

export default function TransactionList(){
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');

    const filteredTransactions = useMemo(
        () =>
            TRANSACTION_DATA.filter((t: TransactionType) => {
                console.log("filtering...");
                return t.place.name.toLowerCase().includes(search.toLowerCase());
            }),
            [search],
    );

    return(
        <>
            <h1 className='text-2xl font-bold text-center mb-4'>Transactions</h1>
            <div className="flex justify-between mb-4 gap-2">
                <div className="flex gap-2 w-1/2">
                    <Input 
                        type="search"
                        placeholder="Search by place..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button
                        variant="outline"
                        onClick={() => setSearch(text)}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <TransactionTable transactions = {filteredTransactions}/>
        </>
    )
}