
    "use client";

    import React from "react";
    import DeepLinkButton from "@/components/deep-link-button";

        export default function MyLayout() {
            return (
                <div className="min-h-screen flex flex-col items-center">
                    <div className="w-full p-4 text-center">
                        <h1 className="text-2xl font-bold">My Website</h1>
                    </div>
                    <div className="flex-grow w-full p-4">
                        <div className="mt-6 flex justify-center">
                            <DeepLinkButton
                                label="Open MyApp"
                                scheme="myapp://"
                                path="open"
                                params={{ ref: "homepage" }}
                                callbackParam="callback"
                                callbackUrl={typeof window !== "undefined" ? window.location.href : undefined}
                                androidStoreUrl="https://play.google.com/store/apps/details?id=com.example.myapp"
                                iosStoreUrl="https://apps.apple.com/app/id123456789"
                                webFallbackUrl="https://www.example.com/download"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            );
        }