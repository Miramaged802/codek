import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUp, FiPhone } from "react-icons/fi";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
} from "react-icons/fi";

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Clara",
      role: "Web Developer",
      image: "/img/per1.png",
      text: "using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.",
    },
    {
      id: 2,
      name: "Sarah",
      role: "UI Designer",
      image: "/img/per1.png",
      text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites.",
    },
    {
      id: 3,
      name: "Michael",
      role: "Product Manager",
      image: "/img/per1.png",
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    },
  ];

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Clean up on unmount
  }, [testimonials.length]);

  // Handle testimonial navigation
  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 sm:py-28 md:py-36 lg:py-48 text-white"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container text-center px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Create Your Professional Website in Minutes!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-100 max-w-2xl mx-auto">
            Build beautiful, responsive websites without writing a single line
            of code. Perfect for small businesses and professionals.
          </p>
          <div className="flex justify-center">
            <Link
              to="/signup"
              className="btn bg-primary-700 hover:bg-primary-800 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-md uppercase tracking-wider transition-colors duration-300"
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-8 sm:py-12 bg-white dark:bg-dark-900 border-t border-b border-gray-200 dark:border-dark-700">
        <div className="container px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-gray-700 dark:text-gray-200">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
            <img
              src="img/logoinvest1.png"
              alt="Investing.com"
              className="h-6 sm:h-8 object-contain"
            />
            <img
              src="img/logoinvest2.png"
              alt="DevelopedIO"
              className="h-6 sm:h-8 object-contain"
            />
            <img
              src="img/logoivset3.png"
              alt="TechCrunch"
              className="h-6 sm:h-8 object-contain"
            />
            <img
              src="img/logoinvest4.png"
              alt="Forbes"
              className="h-6 sm:h-8 object-contain"
            />
            <img
              src="img/logoinvset5.png"
              alt="Y Combinator"
              className="h-6 sm:h-8 object-contain"
            />
            <img
              src="img/logoinvset6.png"
              alt="Another Sponsor"
              className="h-6 sm:h-8 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-dark-900">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 dark:text-white">What They Say</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Their opinion about the perceived goodness with the experience they
            gone through.
          </p>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 flex justify-between z-10" style={{width: 'calc(100% + 80px)', left: '-40px'}}>
              <button
                onClick={() =>
                  goToTestimonial(
                    (currentTestimonial - 1 + testimonials.length) %
                      testimonials.length
                  )
                }
                className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  goToTestimonial(
                    (currentTestimonial + 1) % testimonials.length
                  )
                }
                className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            
            {/* Testimonial Slider */}
            <div className="w-full overflow-hidden">
              {/* Desktop View - 3 cards */}
              <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="relative mt-16 mb-8">
                    {/* Profile Image - Absolutely positioned */}
                    <div className="absolute -top-14 sm:-top-16 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="rounded-full overflow-hidden border-6 sm:border-8 border-yellow-100" style={{ backgroundColor: "#FFF3D8" }}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="bg-gray-100 dark:bg-dark-700 rounded-lg p-4 sm:p-6 pt-12 sm:pt-16 text-center h-full shadow-sm">
                      <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg mb-4 sm:mb-6">
                        {testimonial.text}
                      </p>
                      <h3 className="font-bold text-xl sm:text-2xl mb-1">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile View - Single card with slider */}
              <div className="md:hidden relative mt-14 sm:mt-16 mb-6 sm:mb-8">
                {/* Profile Image - Absolutely positioned */}
                <div className="absolute -top-14 sm:-top-16 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="rounded-full overflow-hidden border-6 sm:border-8 border-yellow-100" style={{ backgroundColor: "#FFF3D8" }}>
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                    />
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="bg-gray-100 dark:bg-dark-700 rounded-lg p-4 sm:p-6 pt-12 sm:pt-16 text-center shadow-sm">
                  <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg mb-4 sm:mb-6 transition-opacity duration-300">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <h3 className="font-bold text-xl sm:text-2xl mb-1 transition-opacity duration-300">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base transition-opacity duration-300">
                    {testimonials[currentTestimonial].role}
                  </p>
                  
                  {/* Navigation Dots for Mobile */}
                  <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors duration-300 ${
                          index === currentTestimonial
                            ? "bg-primary-700"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Mobile Navigation Buttons */}
                  <div className="flex justify-between mt-4 sm:hidden">
                    <button
                      onClick={() =>
                        goToTestimonial(
                          (currentTestimonial - 1 + testimonials.length) %
                            testimonials.length
                        )
                      }
                      className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        goToTestimonial(
                          (currentTestimonial + 1) % testimonials.length
                        )
                      }
                      className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="py-16 bg-gray-100 dark:bg-dark-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            See What We've Built
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-md">
              <img
                src="/img/silider1.jpg"
                alt="E-commerce Website"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  E-commerce Website
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Online store with product catalog and secure checkout
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium flex items-center"
                >
                  View More <FiChevronRight className="ml-1" />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-md">
              <img
                src="/img/slider2.jpg"
                alt="Portfolio Website"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Portfolio Website
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Showcase your work with this elegant portfolio template
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium flex items-center"
                >
                  View More <FiChevronRight className="ml-1" />
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-md">
              <img
                src="/img/sider3.jpg"
                alt="Business Website"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Business Website</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Professional website for small to medium businesses
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium flex items-center"
                >
                  View More <FiChevronRight className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {/* FAQ Accordion */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(0)}
                >
                  <span className="font-medium">
                    What is this platform and how does it work?
                  </span>
                  {activeIndex === 0 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 0 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    Codak is a website builder platform that allows you to
                    create professional websites without any coding knowledge.
                    Simply choose a template, customize it with our
                    drag-and-drop editor, add your content, and publish your
                    site. We handle all the technical aspects like hosting and
                    security.
                  </p>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(1)}
                >
                  <span className="font-medium">
                    Do I need any technical skills to use the website?
                  </span>
                  {activeIndex === 1 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 1 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    No technical skills required! Our drag-and-drop editor is
                    designed to be intuitive and user-friendly. If you can use
                    basic office software, you can build a website with Codak.
                  </p>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(2)}
                >
                  <span className="font-medium">
                    What are the differences between the free, monthly, and
                    yearly packages?
                  </span>
                  {activeIndex === 2 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 2 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    Our free plan allows you to create a basic website with
                    Codak branding. The monthly and yearly plans remove
                    branding, provide more templates, advanced features, and
                    priority support. Yearly plans come with a significant
                    discount compared to monthly billing.
                  </p>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(3)}
                >
                  <span className="font-medium">
                    Can I upgrade my strategy later?
                  </span>
                  {activeIndex === 3 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 3 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    Yes, you can upgrade your plan at any time! When you
                    upgrade, you'll immediately get access to all the new
                    features. We'll prorate your billing to account for the
                    remaining time on your current plan.
                  </p>
                </div>
              </div>

              {/* FAQ Item 5 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(4)}
                >
                  <span className="font-medium">How is my data handled?</span>
                  {activeIndex === 4 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 4 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    We take data security seriously. All your information is
                    stored securely, and we never sell your data to third
                    parties. For more information, please review our Privacy
                    Policy.
                  </p>
                </div>
              </div>

              {/* FAQ Item 6 */}
              <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-dark-800 dark:text-white"
                  onClick={() => toggleFAQ(5)}
                >
                  <span className="font-medium">
                    Can I connect my own domain?
                  </span>
                  {activeIndex === 5 ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div className={activeIndex === 5 ? "block" : "hidden"}>
                  <p className="p-4 text-gray-700 dark:text-gray-300">
                    Yes! On our paid plans, you can connect your own custom
                    domain to your Codak website. We provide simple instructions
                    to help you set up your domain correctly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
