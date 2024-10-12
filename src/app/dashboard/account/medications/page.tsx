import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Medications = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="flex flex-col justify-start items-start mx-auto py-8 w-full max-w-3xl">
            <div className="flex flex-col items-start gap-2">
                <h2 className="font-semibold text-xl">
                     Know your medications
                </h2>
                <p className="text-muted-foreground text-sm">
                     What medications are you taking?
                </p>
            </div>
            <div className="flex flex-col items-start gap-y-8 py-8 w-full">
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                        Name of medications
                    </span>
                    <div className="flex items-center gap-8">
                        {medications?.map((med) => (
                            <p key={med.id} className="text-sm capitalize">
                                {med.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                        What is dosage?
                    </span>
                    <div className="flex items-center gap-8">
                        {medications?.map((symptom) => (
                            <p key={symptom.id} className="text-sm capitalize">
                                {symptom.dosage}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                         Why are you taking these medications?
                    </span>
                    <div className="flex items-center gap-8">
                        {medications?.map((med) => (
                            <p key={med.id} className="text-sm capitalize">
                               {med.purpose}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                          How often do you take these medications?
                    </span>
                    <div className="flex items-center gap-8">
                        {medications?.map((med) => (
                            <p key={med.id} className="text-sm capitalize">
                               {med.frequency.toLowerCase()}
                            </p>
                        ))}
                    </div>
                </div>
                <div>
                    <Link href="/dashboard/account/settings" className={buttonVariants({ size: "sm", variant: "black" })}>
                        Update medications
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Medications
