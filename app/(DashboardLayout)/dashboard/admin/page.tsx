export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-gray-900 uppercase italic">
        Admin Dashboard
      </h1>
      <p className="text-gray-500 font-medium">
        স্বাগতম! এখান থেকে আপনি পুরো সিস্টেম কন্ট্রোল করতে পারবেন।
      </p>

      {/* এখানে আপনার অ্যাডমিন প্যানেলের কার্ড বা স্ট্যাটাস শো করতে পারেন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Total Movies
          </h3>
          <p className="text-4xl font-black mt-2 text-orange-600">120</p>
        </div>
        {/* আরও কার্ড... */}
      </div>
    </div>
  );
}
