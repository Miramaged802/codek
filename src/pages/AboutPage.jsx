import { FiUsers, FiStar, FiHeadphones } from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="img/banner.jpg" 
            alt="Coding workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative z-10 w-full">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white">About us</h1>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white dark:bg-dark-900">
      <div className=" mx-auto px-4">
        <div className="px-4 md:px-12 w-full">
          {/* Main Grid: Text on Right, Titles and Cards on Left */}
          <div className="w-[90%] justify-center items-center align-center flex mx-auto" >
          <div className="flex flex-col md:flex-row justify-center">
            {/* Left Column: Titles and Cards */}
            <div className="flex flex-col w-full md:w-[40%] mb-6 md:mb-0">
              {/* Titles */}
              <div className="mb-6">
                <div className="inline-block bg-transparent text-black text-sm px-4 py-1 rounded-full border border-black mb-3 dark:text-white dark:border-white">About us</div>
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-normal  md:text-left dark:text-white" style={{fontFamily: 'Poppins, sans-serif'}}>Why Choose Us?</h2>
              </div>

            </div>

            {/* Right Column: Descriptive Text */}
            <div className="w-full md:w-[60%]">
              <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg dark:text-white">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text
              </p>
            </div>
          </div>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:bg-dark-900" style={{marginTop: '2rem'}}>
                {/* Feature 1 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center space-x-4 dark:bg-dark-900 ">
                  <div className="bg-indigo-100 p-4 rounded-full flex items-center justify-center">
                    <FiUsers className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Mobile-Friendly Design</h3>
                    <p className="text-gray-600 text-sm dark:text-white">
                      All websites are fully responsive and optimized for any device.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center space-x-4 dark:bg-dark-900">
                  <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center">
                    <FiStar className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Secure & Reliable Hosting</h3>
                    <p className="text-gray-600 text-sm dark:text-white">
                      Enjoy fast and secure web hosting with 99.9% uptime guarantee.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center space-x-4 dark:bg-dark-900">
                  <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center">
                    <FiHeadphones className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">24/7 Customer Support</h3>
                    <p className="text-gray-600 text-sm dark:text-white">
                      Our expert team is always here to assist you, anytime you need help!
                    </p>
                  </div>
                </div>
           </div>

          {/* Image Grid: Overlapping Images */}
          <div className="flex flex-col md:flex-row gap-6 mt-16 w-full">
            {/* Left Image - Larger */}
            <div className="w-full md:w-2/3 rounded-lg overflow-hidden shadow-md relative">
              <img
                src="img/about1.jpg"
                alt="Team working together"
                className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover"
              />
            </div>
            
            {/* Right Image - Smaller with Play Button */}
            <div className="hidden md:block w-full md:w-1/3 rounded-lg absolute translate-x-1/2 translate-y-1/2" style={{left: '800px' , top: '880px'  , borderTopLeftRadius: '10px' , borderTopRightRadius: '10px' , borderBottomLeftRadius: '10px' , borderBottomRightRadius: '10px' }}>
              <img
                src="img/about2.png"
                alt="Development work"
                className="w-full h-[500px] object-cover"
                style={{borderTopLeftRadius: '10px' , borderTopRightRadius: '10px' , borderBottomLeftRadius: '10px' , borderBottomRightRadius: '10px' , border: '6px solid white'}}
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gray-100 dark:bg-dark-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Members</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
                It is a long established fact that a reader will be distracted
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Team Member 1 */}
              <div className="relative bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden h-[320px] sm:h-[350px] md:h-[370px]">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-b-lg p-3 md:p-4 text-center absolute" 
                style={{right: '50%', top: '50%', transform: 'translate(50%, 0)', width: '80%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
                  <h3 className="text-lg md:text-xl font-bold text-white">Ahmed</h3>
                  <p className="text-indigo-200 mb-2 md:mb-3 text-sm md:text-base">Web Developer</p>
                </div>
                <div className="p-2 md:p-3 flex justify-center space-x-3 md:space-x-4 bg-white dark:bg-dark-800 absolute" style={{bottom: '0px', width: '100%'}}>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaInstagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaFacebookF className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="relative bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden h-[320px] sm:h-[350px] md:h-[370px]">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-b-lg p-3 md:p-4 text-center absolute"
                style={{right: '50%', top: '50%', transform: 'translate(50%, 0)', width: '80%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
                  <h3 className="text-lg md:text-xl font-bold text-white">gabriel</h3>
                  <p className="text-indigo-200 mb-2 md:mb-3 text-sm md:text-base">mobile developer</p>
                </div>
                <div className="p-2 md:p-3 flex justify-center space-x-3 md:space-x-4 bg-white dark:bg-dark-800 absolute" style={{bottom: '0px', width: '100%'}}>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaInstagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaFacebookF className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="relative bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden h-[320px] sm:h-[350px] md:h-[370px]">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-b-lg p-3 md:p-4 text-center absolute"
                style={{right: '50%', top: '50%', transform: 'translate(50%, 0)', width: '80%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
                  <h3 className="text-lg md:text-xl font-bold text-white">gorge</h3>
                  <p className="text-indigo-200 mb-2 md:mb-3 text-sm md:text-base">full stack developer</p>
                </div>
                <div className="p-2 md:p-3 flex justify-center space-x-3 md:space-x-4 bg-white dark:bg-dark-800 absolute" style={{bottom: '0px', width: '100%'}}>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaInstagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaFacebookF className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
              </div>
              
              {/* Team Member 4 */}
              <div className="relative bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden h-[320px] sm:h-[350px] md:h-[370px]">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-indigo-700 dark:bg-indigo-800 rounded-b-lg p-3 md:p-4 text-center absolute"
                style={{right: '50%', top: '50%', transform: 'translate(50%, 0)', width: '80%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
                  <h3 className="text-lg md:text-xl font-bold text-white">mohamed</h3>
                  <p className="text-indigo-200 mb-2 md:mb-3 text-sm md:text-base">software engineer</p>
                </div>
                <div className="p-2 md:p-3 flex justify-center space-x-3 md:space-x-4 bg-white dark:bg-dark-800 absolute"
                style={{bottom: '0px', width: '100%'}} >
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaInstagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaFacebookF className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-indigo-700">
                    <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;