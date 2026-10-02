import { cn } from '@/lib/utils';
import {StarIcon } from "lucide-react"

interface StarProps {
    index: number;
    selected?: boolean;
    onSelect?: (index: number) => void
}
function Star({ index, selected = false, onSelect = () => {} }: StarProps){
    const handleClick = () => {
        onSelect(index + 1);
    }

    return (
        <StarIcon 
            size={22} 
            className={cn('cursor-pointer transition-all duration-150 fill-current', {
                'text-amber-400 scale-110 drop-shadow-sm' : selected,
                'text-muted-foreground/40' : !selected,
            })} 
            onClick={handleClick}
            />
    )
}

interface StarRatingProps {
    totalStars?: number;
    selectedStars?: number;
    onRate: (rating: number) => void;
}

export default function StarRating({
    totalStars = 5,
    selectedStars = 0,
    onRate
    }: StarRatingProps){
    const stars = [...new Array(totalStars)]

    return (
        <div className="flex flex-col gap-2">
            <div className='flex flex-row items-center gap-0.5'>
                {stars.map((_, i) => (
                 <Star 
                    key={i}
                    selected = {i < selectedStars}
                    index={i}
                    onSelect={onRate}
                    />
                ))}
            </div>
            <p className="text-xs text-muted-foreground pl-5">
                {selectedStars} of {totalStars} stars
            </p>
        </div>
    )
}