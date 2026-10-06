import { useParams } from 'react-router';
import { PLACE_DATA } from '@/api/mock_data';

const PlaceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const idAsNumber = Number(id);

    const place = PLACE_DATA.find((p) => p.id === idAsNumber);

    if (!place) {
        return (
            <>
                <h1 className='text-2xl font-semibold mb-6'>Place not found</h1>
                <p>No place was found with id {id}.</p>
            </>
        )
    }

    return (
        <>
            <h1 className='text-2xl font-semibold mb-6'>Place {place.name}</h1>
            <p>Transactions for {place.name} will appear here.</p>
        </>
    )
}

export default PlaceDetail