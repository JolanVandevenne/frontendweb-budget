import type { Place as PlaceType} from '../../types.ts'
import {Card, CardAction, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Button} from '@/components/ui/button.tsx'
import StarRating from './StarRating.tsx'
import { Trash } from 'lucide-react'
import { Link } from 'react-router'

interface PlaceProps extends PlaceType{
    onDelete : (id:number) => void
    onRate : (id: number, newRating: number) => void
}

const Place = ({ id, name, rating, onDelete, onRate}: PlaceProps) => {
    const handleRate = (newRating: number) => {
        onRate(id, newRating)
    }

    const handleDelete = () => {
        onDelete(id)
    }

    return( 
        <Card>
            <CardHeader className='pb-2'>
                <CardTitle className='text-base'>
                    <Link to={`/places/${id}`} className='hover:underline'>
                        {name}
                    </Link>
                </CardTitle>
                <CardAction>
                    <Button 
                        variant="link"
                        size="icon" 
                        className="text-destructive hover:text-destructive" 
                        onClick = {handleDelete}>
                        <Trash/>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <StarRating 
                    selectedStars={rating}
                    onRate= {handleRate}  
                />    
            </CardContent>
        </Card>
        )
};
export default Place;