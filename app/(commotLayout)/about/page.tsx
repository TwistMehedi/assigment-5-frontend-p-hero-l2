const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#141414] text-gray-900 dark:text-white transition-colors duration-300 pb-20">
      <div
        className="relative h-[45vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          MOVIE <span className="text-primary">PORTAL</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white dark:bg-[#1c1c1c] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-200 rounded-full"></span>
              About Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed max-w-3xl">
              Welcome to{" "}
              <span className="font-bold text-primary">Movie-Portal</span>. We
              provide a premium experience for movie enthusiasts. From local
              classics to global blockbusters, everything is now within your
              reach.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-[#252525] border border-transparent hover:border-red-600/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                To create the most user-friendly movie library for everyone,
                everywhere. We believe great stories should be accessible to
                all.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-[#252525] border border-transparent hover:border-red-600/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                The Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                High definition streaming with a clutter-free, cinematic
                interface designed to put the focus back on the movies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
