import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-2xl rounded-3xl p-8 transition-all hover:scale-[1.02] hover:shadow-3xl duration-300">
        {/* Profile Image and Name */}
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-neutral-700 ring-4 ring-blue-200 dark:ring-blue-900 shadow-lg transition-all"
            src="https://tse2.mm.bing.net/th/id/OIP.qUzJIjChocSMt46b4Kgw2AHaHj?pid=Api&P=0&h=180"
            alt="Profile"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
              Ausaf Ahmad
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Graphic Designer, Web Designer/Developer
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-gray-200 dark:border-neutral-700" />

        {/* About Section */}
        <div className="mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            I am a seasoned web designer with over 1 year of experience in creating visually appealing and user-centric designs. My expertise spans UI design, design systems, and custom illustrations.
          </p>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Currently, I work remotely for Notion, where I design template UIs, convert them into HTML and CSS, and provide support to users. I love crafting elegant and functional designs.
          </p>
        </div>

        <div className="my-6 border-t border-gray-200 dark:border-neutral-700" />

        {/* Contact Links */}
        <ul className="mt-4 space-y-4">
          <li className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect width={20} height={16} x={2} y={4} rx={2} />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <a href="mailto:kausaf98@gmail.com" className="text-sm text-blue-600 hover:underline dark:text-blue-400 font-medium">
              Kausaf98@gmail.com
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-neutral-700 rounded-full">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.188 10.162 22.75 0h-2.029l-7.434 8.824L7.349 0H.5l8.979 13.343L.5 24h2.029l7.851-9.318L16.651 24H23.5L14.188 10.162Zm-2.779 3.299L3.26 1.56h3.117L20.722 22.511h-3.117l-6.195-9.05Z" />
              </svg>
            </span>
            <a href="https://github.com/Ausaf17" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline dark:text-blue-400 font-medium">
              @Ausaf17
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
