import { useState } from "react";

const CTASection: React.FC = () => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            alert("Enter a valid email!");
            return;
        }
        
        alert(`Subscribed: ${email}`);
        setEmail('');
    };

    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0">
                {/* Blue gradient corners */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-50 to-transparent"></div>
                
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
                        linear-gradient(180deg, #e5e7eb 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 0.3
                }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20">
                {/* Top Badge */}
                <div className="mb-12 group cursor-pointer">
                    <div className="relative">
                        <div className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-sm tracking-widest uppercase 
                                       group-hover:bg-white group-hover:text-blue-600 
                                       transition-all duration-500 
                                       border-2 border-blue-600
                                       shadow-lg group-hover:shadow-xl">
                            Subscribe Now
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full 
                                       group-hover:bg-white group-hover:border-blue-600
                                       border-2 border-white 
                                       transition-all duration-500"></div>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6">
                    <span className="text-gray-900 block">
                        STAY
                    </span>
                    <span className="text-blue-600 block mt-2">
                        CONNECTED
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                    Join <span className="font-bold text-blue-600">10,000+ professionals</span> who get weekly insights, 
                    exclusive content, and tools you won't find anywhere else.
                </p>

                {/* Stats Cards */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {[
                        { value: "99%", label: "Open Rate", icon: "📈" },
                        { value: "24h", label: "Delivery", icon: "⚡" },
                        { value: "0%", label: "Spam", icon: "🚫" }
                    ].map((stat, index) => (
                        <div 
                            key={index}
                            className="group relative bg-white border-2 border-blue-200 rounded-2xl p-6 
                                     hover:bg-blue-600 hover:text-white hover:border-blue-600
                                     transition-all duration-500 cursor-pointer
                                     shadow-lg hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-500">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-blue-600 group-hover:text-white mb-1 transition-colors duration-500">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-white/80 font-medium transition-colors duration-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Email Form */}
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl bg-blue-600 rounded-3xl p-8 md:p-10 
                             hover:bg-white hover:border-blue-600
                             border-4 border-blue-600
                             transition-all duration-500
                             shadow-2xl hover:shadow-3xl group"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Email Input */}
                        <div className="flex-grow relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full px-6 py-5 text-lg bg-white text-gray-900 rounded-2xl 
                                         border-2 border-blue-600 group-hover:border-blue-600
                                         focus:outline-none focus:ring-4 focus:ring-blue-300
                                         placeholder-gray-400
                                         transition-all duration-500
                                         shadow-inner"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 
                                         text-blue-600 group-hover:text-blue-600 transition-colors duration-500">
                                ✉️
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl 
                                     hover:bg-blue-600 hover:text-white
                                     border-2 border-blue-600
                                     transition-all duration-500
                                     shadow-lg hover:shadow-2xl
                                     hover:scale-105 active:scale-95
                                     relative overflow-hidden group/btn"
                        >
                            {/* Button Hover Effect */}
                            <span className="absolute inset-0 bg-blue-600 transform -translate-x-full 
                                           group-hover/btn:translate-x-0 transition-transform duration-500"></span>
                            <span className="relative flex items-center justify-center gap-3">
                                <span className="group-hover/btn:rotate-12 transition-transform duration-500">🚀</span>
                                SUBSCRIBE
                            </span>
                        </button>
                    </div>
                    
                    {/* Privacy Note */}
                    <div className="mt-8 flex items-center justify-center gap-3 
                                  text-white group-hover:text-blue-600 
                                  transition-colors duration-500">
                        <span className="text-lg">🔒</span>
                        <span className="text-sm font-medium">
                            No spam. Unsubscribe anytime. We respect your privacy.
                        </span>
                    </div>
                </form>

                {/* Social Proof */}
                <div className="mt-20 text-center">
                    <p className="text-gray-600 text-sm mb-6 uppercase tracking-widest">Trusted By</p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {[
                            { name: "Tech Corp", color: "text-blue-600" },
                            { name: "Startup XYZ", color: "text-blue-600" },
                            { name: "Dev Agency", color: "text-blue-600" }
                        ].map((company, index) => (
                            <div 
                                key={index}
                                className="px-6 py-3 bg-white border-2 border-blue-200 rounded-lg
                                         hover:bg-blue-600 hover:text-white hover:border-blue-600
                                         transition-all duration-500 cursor-pointer
                                         group/company"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full bg-blue-600 
                                                   group-hover/company:bg-white 
                                                   transition-colors duration-500`}></div>
                                    <span className="font-semibold text-gray-900 
                                                   group-hover/company:text-white
                                                   transition-colors duration-500">
                                        {company.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Animated Dots */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-200 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `pulse ${2 + Math.random() * 2}s infinite`
                        }}
                    ></div>
                ))}
            </div>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.2); }
                }
                
                /* Smooth focus effects */
                input:focus {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 40px rgba(37, 99, 235, 0.1);
                }
                
                /* Card hover effects */
                div:hover {
                    z-index: 10;
                }
                
                /* Button shine effect on hover */
                button:hover::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    animation: shine 1.5s infinite;
                }
                
                @keyframes shine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }
                
                /* Smooth transitions for all */
                * {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 300ms;
                }
            `}</style>
        </section>
    );
};

export default CTASection;