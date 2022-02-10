import Link from 'next/link'
import { Layout } from '../components/Layout'
import Button from '@material-tailwind/react/Button'
import { useAuth } from '../lib/context/useAuth'
import dbConnect from '../lib/dbConnect'

const Index = ({ pets }) => {
    const auth = useAuth()
    // auth.signin('moore.jesse@gmail.com', 'Testing00!')
    console.log(auth)
    return (
        <>
            <div>HOME</div>
        </>
    )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    //     await dbConnect()

    //     /* find all the data in our database */
    //     //   const result = await Pet.find({})
    //     //   const pets = result.map((doc) => {
    //     //     const pet = doc.toObject()
    //     //     pet._id = pet._id.toString()
    //     //     return pet
    //     //   })

    return { props: { pets: [] } }
}

export default Index
