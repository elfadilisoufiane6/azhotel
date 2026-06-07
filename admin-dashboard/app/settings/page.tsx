"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-display text-3xl text-midnight-800">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Brand details, integrations, and staff accounts.</p>
      </header>

      <section className="card card-pad space-y-4">
        <h2 className="font-display text-2xl text-midnight-800">Hotel profile</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Hotel name"  defaultValue="AZ Hôtel des Arts" />
          <Field label="Phone"        defaultValue="+212 5 37 00 00 00" />
          <Field label="Reservations email" defaultValue="reservations@azhoteldesarts.com" />
          <Field label="Currency"     defaultValue="MAD" />
        </div>
      </section>

      <section className="card card-pad space-y-4">
        <h2 className="font-display text-2xl text-midnight-800">Policies</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Check-in time"  defaultValue="15:00" />
          <Field label="Check-out time" defaultValue="12:00" />
        </div>
      </section>

      <button className="btn-primary">Save changes</button>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</span>
      <input defaultValue={defaultValue} className="mt-2 w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-gold-400" />
    </label>
  );
}
