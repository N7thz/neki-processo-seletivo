import { Card } from "@/components/ui/card";

export default function Loading() {

    return (

        <div
            className="flex min-h-screen justify-center items-center backgroundHome absolute inset-0 -z-50"
        >
            <Card
                className='w-10/12 max-h-[700px] items-center bg-zinc-200 border border-violet-500 animate-pulse'
            />
        </div>
    )
}