import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex">
            {/* Left side - Image Panel */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-gray-950/60 z-10"></div>
                <Image 
                    src="/anime.png" 
                    alt="Anime illustration"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay content */}
                <div className="relative z-20 flex flex-col justify-end p-12 text-white">
                    <div className="space-y-4">
                        <h1 className="text-4xl xl:text-5xl font-bold text-white drop-shadow-2xl shadow-black/80" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 16px rgba(0,0,0,0.6)'}}>
                            Welcome Back
                        </h1>
                        <p className="text-lg xl:text-xl text-gray-100 max-w-md leading-relaxed drop-shadow-lg" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
                            Enter your world of endless possibilities and adventures
                        </p>
                    </div>
                </div>
            </div>

            {/* left side - Sign in Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile image preview */}
                    <div className="lg:hidden mb-8 relative h-32 w-full rounded-2xl overflow-hidden">
                        <Image 
                            src="/anime.png" 
                            alt="Anime illustration"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white">
                            Sign In
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Continue to your account
                        </p>
                    </div>

                    {/* Clerk Sign In Component with custom styling wrapper */}
                    <div className="relative">
                        <div className="absolute text-white inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
     
                            <SignIn 
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-none",
                                     
                               
                                        socialButtonsBlockButton: "bg-gray-800 border-gray-700 hover:bg-gray-750 text-blue-500 transition-all duration-200",
                                        formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200",
                                        formFieldInput: "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-200",
                                        footerActionLink: "text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                    }
                                }}
                            />
              
                    </div>

                    {/* Decorative elements */}
                    <div className="flex items-center justify-center space-x-4 opacity-30">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
                    </div>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
        </div>
    )
}