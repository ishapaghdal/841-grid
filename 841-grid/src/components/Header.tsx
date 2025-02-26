const Header = () => {
  return (
    <header className="w-full bg-background dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full flex flex-col">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-center py-2 font-semibold">
          🚀 Check out my $841K journey!
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mt-4 px-5 pb-4">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧑‍💻</span>
                <span className="font-bold dark:text-white">Florin Pop</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 space-x-3">
                <a href="#" className="hover:underline">
                  Blog
                </a>
                <span>/</span>
                <a href="#" className="hover:underline">
                  Projects
                </a>
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl font-bold mt-6 dark:text-white">
              My $8,410,000 Grid
            </h1>
            {/* <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
              For the{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                One Million Dollar
              </span>{" "}
              challenge. Each square represents $1,000.
            </p> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
