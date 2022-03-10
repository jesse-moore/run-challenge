import { GetStaticProps } from 'next'

export default function Profile() {
    return null
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        redirect: {
            destination: '/standings/overview',
            permanent: false,
        },
    }
}