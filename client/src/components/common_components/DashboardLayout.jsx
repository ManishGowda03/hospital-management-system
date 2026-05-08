// components/dashboard/DashboardLayout.jsx
export default function DashboardLayout({ left, right }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <aside className="w-full lg:w-[22%]">{left}</aside>

      <main className="w-full lg:w-[78%]">{right}</main>
    </div>
  );
}


