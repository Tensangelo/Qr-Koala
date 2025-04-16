import { Spinner } from "@assets/icons/spinner"
import Image from "next/image"

interface PropsLoding {
    message?: string
}

export const Loading = ({ message }: PropsLoding) => {
    return (
        <section className="flex justify-center items-center w-full min-h-screen flex-col gap-5">
            <Image
                src="/images/qr_koala_logo_large.png"
                alt='Logo QR Koala'
                priority={true}
                width={150}
                height={150}
            />
            <Spinner
                className="w-10 h-10 mr-2 "
                colorPrimary="#3b82f6"
            />
            <p className="text-center text-lg font-bold">{message}</p>
        </section>
    )
}