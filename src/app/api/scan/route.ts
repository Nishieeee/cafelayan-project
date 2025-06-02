import {NextResponse} from 'next/server';

interface ScanLog {
    orgId: string; 
    city: string;
    userId: string;
    donationTo: string;
    date: string;
}

const scanlogs: ScanLog[] = []

export async function POST(req: Request) {
    const body = await req.json()
    const { orgId, city, userId, donationTo } = body

    scanlogs.push({
        orgId, 
        city, 
        userId, 
        donationTo,
        date: new Date().toISOString(),
    })

    return NextResponse.json( { success:true } )
}

export async function GET() {
    return NextResponse.json(scanlogs)
}