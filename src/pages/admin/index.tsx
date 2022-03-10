import { GetStaticProps } from 'next'

export default function Admin() {
    return null
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        redirect: {
            destination: '/admin/challenge',
            permanent: false,
        },
    }
}
