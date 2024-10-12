import { CheckoutButton } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const BillingPage = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not found");
        }

        const dbUser = await db.user.findUnique({
            where: {
                id: user.id,
            },
        });

        const isPro = !!dbUser?.stripeCustomerId;

        return (
            <div className="flex flex-col justify-start items-start mx-auto py-8 w-full max-w-3xl">
                <div className="flex flex-col items-start gap-2">
                    <h2 className="font-semibold text-xl">
                        Manage your billing
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Check your billing information
                    </p>
                </div>
                <div className="flex flex-col items-start py-8 w-full">
                    <h4 className="font-medium text-lg">
                        {isPro ? "Pro" : "Free"} Plan
                    </h4>
                    <p className="mt-1 text-muted-foreground">
                        {isPro ? "You are subscribed to the Pro plan. Enjoy all the features!" : "You are using the Free plan."}
                    </p>
                    <CheckoutButton isPro={isPro} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in BillingPage:", error);
        throw error; // Re-throw the error instead of returning a JSX element
    }
};

export default BillingPage;
